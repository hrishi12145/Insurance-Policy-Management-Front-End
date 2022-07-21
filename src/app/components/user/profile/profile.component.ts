import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/model/user';
import { MatTableDataSource } from '@angular/material/table';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userList: Array<User>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
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
  selectedUser: User = new User();
  errorMessage: string;
  infoMessage: string;

  currentUser: User;
  constructor(private adminService: AdminService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {}

  editUserRequest(user: User) {
    this.selectedUser = user;
    $('#userModal').modal('show');
  }

  updateUser() {
    this.adminService
      .updateUser(this.selectedUser.id, this.selectedUser)
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
