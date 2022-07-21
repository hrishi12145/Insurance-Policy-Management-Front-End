import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-index-template',
  templateUrl: './index-template.component.html',
  styleUrls: ['./index-template.component.css'],
})
export class IndexTemplateComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  constructor() {}

  ngOnInit(): void {}
}
