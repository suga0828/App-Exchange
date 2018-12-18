import { Component, OnInit } from '@angular/core';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() { }

  scrollToElement($e) {
    this.scrollService.scrollToElement($e);
  }

}
