import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.css']
})
export class TestimonyComponent implements OnInit {

  @ViewChild('carousel') carousel: ElementRef;
  @ViewChild('item') item: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // let elems = document.querySelectorAll('.carousel')
    let elems = this.renderer.selectRootElement(this.carousel).nativeElement
    let instances = M.Carousel.init(elems, {
      fullWidth: true,
      indicators: true,
      duration: 100
    },);

  }

}
