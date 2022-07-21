import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Policy } from 'src/app/model/policy';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var $: any;

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css'],
})
export class PolicyListComponent implements OnInit {
  policyList: Array<Policy>;
  dataSource: MatTableDataSource<Policy> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'policyName',
    'description',
    'price',
    'action',
  ];
  selectedPolicy: Policy = new Policy();
  errorMessage: string;
  infoMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllPolicies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllPolicies() {
    this.adminService.getAllPolicies().subscribe((data) => {
      this.policyList = data;
      this.dataSource.data = data;
    });
  }

  createNewProductRequest() {
    this.selectedPolicy = new Policy();
    $('#productModal').modal('show');
  }

  editProductRequest(policy: Policy) {
    this.selectedPolicy = policy;
    $('#productModal').modal('show');
  }

  saveProduct() {
    if (!this.selectedPolicy.id) {
      this.createPolicy();
    } else {
      this.updatePolicy();
    }
  }
  createPolicy() {
    this.adminService.createPolicy(this.selectedPolicy).subscribe((data) => {
      this.policyList.push(data);
      this.dataSource = new MatTableDataSource(this.policyList);
      this.infoMessage = ' Policy Created Successfully....';
      $('#productModal').modal('hide');
    });
  }

  updatePolicy() {
    this.adminService
      .updatePolicy(this.selectedPolicy.id, this.selectedPolicy)
      .subscribe((data) => {
        let itemIndex = this.policyList.findIndex(
          (item) => item.id == this.selectedPolicy.id
        );
        this.policyList[itemIndex] = this.selectedPolicy;
        this.dataSource = new MatTableDataSource(this.policyList);
        this.infoMessage = ' Policy Details Updated Successfully....';
        $('#productModal').modal('hide');
      });
  }

  deleteProductRequest(policy: Policy) {
    this.selectedPolicy = policy;
    $('#deleteModal').modal('show');
  }

  deleteProduct() {
    this.adminService.deletePolicy(this.selectedPolicy.id).subscribe((data) => {
      let itemIndex = this.policyList.findIndex(
        (item) => item.id == this.selectedPolicy.id
      );
      if (itemIndex !== -1) {
        this.policyList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.policyList);
      this.infoMessage = ' Policy Deleted Successfully ........';
      $('#deleteModal').modal('hide');
    });
  }
}
