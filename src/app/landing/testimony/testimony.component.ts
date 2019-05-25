import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit, AfterViewInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}
