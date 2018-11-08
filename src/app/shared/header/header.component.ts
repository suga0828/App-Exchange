import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
  	let elems = document.querySelectorAll(".sidenav");
	let instances = M.Sidenav.init(elems);
  }

  scrollToElement($e) {
  	this.scrollService.scrollToElement($e)
  }

}
