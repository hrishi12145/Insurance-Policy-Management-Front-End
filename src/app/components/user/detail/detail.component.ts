import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/model/policy';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  policyId: string;
  currentPolicy: Policy;

  constructor(private route: ActivatedRoute) {
    this.currentPolicy = JSON.parse(localStorage.getItem('currentPolicy'));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.policyId = params.get('id');
      }
    });
  }
}
