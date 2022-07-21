import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  info: String;
  constructor() {}

  ngOnInit(): void {}

  submit() {
    this.info =
      'Thank You for the message . I will get back to you as soon as possible ! ';
  }
}
