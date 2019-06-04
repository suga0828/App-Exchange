import { Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

	scrollToElement($element): void {
		$element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}
}
