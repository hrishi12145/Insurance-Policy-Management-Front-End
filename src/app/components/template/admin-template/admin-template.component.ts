import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css'],
})
export class AdminTemplateComponent implements OnInit {
  currentAdmin: Admin;

  constructor(private adminService: AdminService, private router: Router) {
    this.adminService.currentAdmin.subscribe((data) => {
      this.currentAdmin = data;
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.adminService.logOut().subscribe((data) => {
      this.router.navigate(['/admin-login']);
    });
  }
}
