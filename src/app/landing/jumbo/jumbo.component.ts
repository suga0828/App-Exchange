import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.css']
})
export class JumboComponent implements OnInit {

	@ViewChild('send') send: ElementRef
	@ViewChild('get') get: ElementRef

	onKey(event: any) {
		let get = this.get.nativeElement.value
		let tax = this.send.nativeElement.value

		console.log(`get: ${get}`)
		console.log(`send: ${tax}`)
		let taxed = get * (1 - (tax/100) )
		this.result = event.target.value * taxed;
	}

	result: number;
	taxs = [10, 20, 30]

	rates = {
		USD : '1',
		COP : '3000',
		VEF : '200'
	}


  constructor() { }

  ngOnInit() {
  }

}
