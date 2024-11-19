import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Constants } from '../../Common/Constants';
import { ButtonComponent } from '../../Template/button/button.component';
import { FaqComponent } from '../../Template/faq/faq.component';
import { PageHeaderComponent } from '../../Template/page-header/page-header.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';
import {MatRadioModule} from '@angular/material/radio';

import { FormGroup } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [
    PageHeaderComponent,
    ButtonComponent,
    FaqComponent,
    FooterSectionComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatChipsModule,
    MatRadioModule,
  ],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.css',
})
export class GetInTouchComponent implements OnInit {
  public headingTemplates: any;
  public readonly browseLibrary = 'BROWSE LIBRARY';

  ngOnInit() {
    this.getHeadingTemplates();
    this.emailFormGroup = new FormGroup({
      yourName: new FormControl(null, Validators.required),
      email: this.email,
      companyName: new FormControl(null, Validators.required),
      websiteUrl: new FormControl(null),
      serviceRequired: new FormControl([], Validators.required),
      projectDetails: new FormControl(null, Validators.required),
    });
  }

  getHeadingTemplates() {
    this.headingTemplates = Constants.HEADING_TEMPLATES;
  }

  errorMessage: Record<string, string> = {
    yourName: '',
    email: '',
    companyName: '',
    serviceRequired: '',
    projectDetails: '',
  };
  emailFormGroup!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
// move this to constants 
  services = [
    'General',
    'Purchase related',
    'Custom template',
    'Category name'
  ];

  constructor(private _snackBar: MatSnackBar
  ) {}

  updateErrorMessage(fcName: string) {
    let newError = '';
    if (
      fcName == 'serviceRequired' &&
      this.emailFormGroup.get(fcName)?.value.length == 0
    ) {
      newError = 'Select atleast 1 service';
    } else if (this.emailFormGroup.get(fcName)!.hasError('required')) {
      newError = 'You must enter a value';
    } else if (this.emailFormGroup.get(fcName)!.hasError('email')) {
      newError = 'Not a valid email';
    } else {
      newError = '';
    }

    for (let errMsg in this.errorMessage) {
      if (errMsg == fcName) {
        this.errorMessage[errMsg] = newError;
      }
    }
  }

  selectService(service: any) {
    const serviceControl = this.emailFormGroup.get('serviceRequired');
    if (!serviceControl) return;

    const currentServices = serviceControl.value as any[];
    if (currentServices.includes(service)) {
      const updatedServices = currentServices.filter((s) => s !== service);
      serviceControl.setValue(updatedServices);
    } else {
      serviceControl.setValue([...currentServices, service]);
    }

    this.updateErrorMessage('serviceRequired');
  }

  submitRequestClicked() {
    console.log('Send email');

    if (this.emailFormGroup.valid) {
      const formValues = this.emailFormGroup.value;
      const templateParams = {
        to_name: 'DZINR',
        from_name: formValues.yourName,
        from_email: formValues.email,
        company: formValues.companyName,
        website_url: formValues.websiteUrl,
        service_required: formValues.serviceRequired.join(', '),
        project_details: formValues.projectDetails,
      };

      emailjs
        .send(
          'service_vrn1bv4',
          'template_rxx0tj1',
          templateParams,
          'VeruUBjIAMcmxkkXU'
        )
        .then((response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
        })
        .catch((error) => {
          console.error('FAILED...', error);
        });
    } else {
      console.error('Form is invalid');
    }

    this._snackBar.open('We will connect with you soon!!!', 'X', {
      duration: 7000,
    });
  }
}
