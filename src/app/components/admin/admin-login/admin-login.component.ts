import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  admin: Admin = new Admin();
  errorMessage: string;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}
  login() {
    this.adminService.login(this.admin).subscribe((data) => {
      if (!data) {
        this.errorMessage = 'Invalid login Credentials';
      } else {
        localStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
      }
    });
  }
  handleError() {
    this.adminService.handleError(this.errorMessage).subscribe((err) => {
      this.errorMessage = 'Username and Password is incorrect';
    });
  }
}
