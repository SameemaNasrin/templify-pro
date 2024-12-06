import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../../Common/Constants';
import { ButtonComponent } from '../../Template/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Common/User';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  navs: any;
  darkThemeRouters = ['/template', '/get-in-touch', '/template-desc'];
  isLoggedIn = false;
  user: User = new User('', '', '', new Date(0));

  constructor(
    public readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getNavs();

    const firebaseUserKey = Object.keys(sessionStorage).find(key => key.startsWith('firebase:authUser:'));
  
  if (firebaseUserKey) {
    const storedUser = sessionStorage.getItem(firebaseUserKey);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const expiresIn = new Date(userData.stsTokenManager.expirationTime);
      const user = new User(
        userData.email,
        userData.localId,
        userData.stsTokenManager.accessToken,
        expiresIn
      );
      this.authService.emitUser(user);
      console.log(user)
    }
  }
    this.authService.user$.subscribe((user) => {
      if (user.token) {
        this.isLoggedIn = true;
        this.user = user;
      } else {
        this.isLoggedIn = false;
        this.user = new User('', '', '', new Date(0));
      }
      console.log(this.isLoggedIn);
      console.log(this.user);
    });
  }

  getNavs() {
    this.navs = Constants.NAVS;
  }

  navigate(routeUrl: string) {
    this.router.navigate([routeUrl]);
  }

  signoutUser() {
    this.authService.signout();
    this.isLoggedIn = false;
    this.user = new User();
    this.authService.emitUser(this.user)
    this.router.navigate(['/'])
  }
}
