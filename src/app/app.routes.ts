import { provideRouter, Routes, withDebugTracing } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ApplicationConfig } from '@angular/core';
import { TemplateComponent } from './Components/template/template.component';
import { BlogComponent } from './Components/blog/blog.component';
import { OurStudioComponent } from './Components/our-studio/our-studio.component';
import { GetInTouchComponent } from './Components/get-in-touch/get-in-touch.component';
import { TemplateDescComponent } from './Components/template-desc/template-desc.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { PaymentFlowComponent } from './Components/payment-flow/payment-flow.component';

export const routes: Routes = [
  { path: 'template', component: TemplateComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'out-studio', component: OurStudioComponent },
  { path: 'get-in-touch', component: GetInTouchComponent },
  { path: 'template-desc/:type/:id', component: TemplateDescComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment-flow', component: PaymentFlowComponent },
  { path: '**', component: HomeComponent },
];
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withDebugTracing())],
};
