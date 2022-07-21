import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css'],
})
export class UserTemplateComponent implements OnInit {
  currentUser: User;
  currentAdmin: Admin;
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
    this.adminService.currentAdmin.subscribe((data) => {
      this.currentAdmin = data;
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.userService.logOut().subscribe((data) => {
      this.router.navigate(['/login']);
    });
    this.adminService.logOut().subscribe((data) => {
      this.router.navigate(['/admin-login']);
    });
  }
}
