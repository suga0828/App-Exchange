import { Component, OnInit, ViewChild, ElementRef,  Renderer2 } from '@angular/core';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.css']
})
export class JumboComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

	@ViewChild('tax') tax: ElementRef
	@ViewChild('rate') rate: ElementRef

  taxs = [10, 20, 30]

  rates = {
    USD : '1',
    COP : '3000',
    VEF : '200'
  }

  taxN: number = null;
  rateN: number = null;
  taxed: number = null;
  taxedN: number = null;
  value: number = null;
  result: number = null;

	onKey(event: any) {
		this.taxN = this.renderer.selectRootElement(this.tax).nativeElement.value;
		this.rateN = this.renderer.selectRootElement(this.rate).nativeElement.value;
    this.taxedN = event.target.value * (this.taxN/100) * this.rateN
    console.log(`Se cobra una comisión de ${this.taxN}%, se utiliza un tipo de cambio de: ${this.rateN} y se obtiene una ganancia de: ${this.taxedN}`)
    this.taxed = this.rateN * (1 - (this.taxN/100) )
    this.result = event.target.value * this.taxed;
	}

}
