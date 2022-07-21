import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.userService.register(this.user).subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }
  handleError() {
    this.userService.handleError(this.errorMessage).subscribe((err) => {
      this.errorMessage = 'Username is already exist';
    });
  }
}
