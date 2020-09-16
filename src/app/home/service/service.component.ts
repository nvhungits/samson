import { Component, OnInit } from '@angular/core';
import { SERVICES } from './mock-service';

@Component({
  selector: '[app-service]',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services = SERVICES
  constructor() { }

  ngOnInit(): void {
  }

}
