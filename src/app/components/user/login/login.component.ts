import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.userService.login(this.user).subscribe((data) => {
      if (!data) {
        this.errorMessage = 'Invalid login Credentials';
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/home']);
      }
    });
  }
  handleError() {
    this.userService.handleError(this.errorMessage).subscribe((err) => {
      this.errorMessage = 'Username and Password is incorrect';
    });
  }
}
