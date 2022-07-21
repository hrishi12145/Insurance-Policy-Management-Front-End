import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'insurance-policy-management';

  currentUser: User;
  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
}
