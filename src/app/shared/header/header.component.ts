import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sidenav') sidenav: ElementRef;

  constructor(
    private scrollService: ScrollService,
    private renderer: Renderer2) { }

  ngOnInit() {

  	// let elems = document.querySelectorAll(".sidenav");
	  let elems = this.renderer.selectRootElement(this.sidenav).nativeElement
    let instances = M.Sidenav.init(elems);
  }

  scrollToElement($e) {
  	this.scrollService.scrollToElement($e)
  }

}
