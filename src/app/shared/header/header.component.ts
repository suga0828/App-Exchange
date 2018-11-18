import { Component, OnInit, Renderer2 } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private scrollService: ScrollService,
    private renderer: Renderer2) { }

  ngOnInit() {

  	// let elems = document.querySelectorAll(".sidenav");
	  let elems = this.renderer.selectRootElement('.sidenav')
    let instances = M.Sidenav.init(elems);
  }

  scrollToElement($e) {
  	this.scrollService.scrollToElement($e)
  }

}
