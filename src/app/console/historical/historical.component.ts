import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {

  messages = [
    'Aún no tiene operaciones realizadas.',
  ];

  constructor() { }

  ngOnInit() {
  }

}
