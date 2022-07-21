import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  admin: Admin = new Admin();
  errorMessage: string;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.adminService.register(this.admin).subscribe((data) => {
      this.router.navigate(['/admin-login']);
    });
  }
  handleError() {
    this.adminService.handleError(this.errorMessage).subscribe((err) => {
      this.errorMessage = 'Username is already exist';
    });
  }
}
