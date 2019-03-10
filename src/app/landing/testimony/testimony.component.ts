import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

import * as M from 'materialize-css/dist/js/materialize';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit {

  @ViewChild('carousel') carousel: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // let elems = document.querySelectorAll('.carousel')

    const elems = this.renderer.selectRootElement(this.carousel).nativeElement;
    const instances = M.Carousel.init(elems, {
      fullWidth: true,
      duration: 200
    }, );

    setInterval(function() {
      const instance = M.Carousel.getInstance(elems).next();
    }, 3000);
  }

}
