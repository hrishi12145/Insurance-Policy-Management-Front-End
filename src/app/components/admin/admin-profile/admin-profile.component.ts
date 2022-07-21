import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/model/admin';
import { MatTableDataSource } from '@angular/material/table';

declare var $: any;
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  userList: Array<Admin>;
  dataSource: MatTableDataSource<Admin> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'userName',
    'password',
    'mobileNo',
    'city',
    'action',
  ];
  selectedUser: Admin = new Admin();
  errorMessage: string;
  infoMessage: string;

  currentAdmin: Admin;
  constructor(private adminService: AdminService) {
    this.currentAdmin = JSON.parse(localStorage.getItem('currentAdmin'));
  }

  ngOnInit(): void {}

  editUserRequest(user: Admin) {
    this.selectedUser = user;
    $('#userModal').modal('show');
  }

  updateAdmin() {
    this.adminService
      .updateAdmin(this.selectedUser.id, this.selectedUser)
      .subscribe((data) => {
        let itemIndex = this.userList.findIndex(
          (item) => item.id == this.selectedUser.id
        );
        this.userList[itemIndex] = this.selectedUser;
        this.dataSource = new MatTableDataSource(this.userList);
        this.infoMessage = 'Mission is completed.';
        $('#userModal').modal('hide');
      });
  }
}
