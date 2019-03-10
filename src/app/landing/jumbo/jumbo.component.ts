import { Component, OnInit, ViewChild, ElementRef,  Renderer2 } from '@angular/core';

@Component({
  selector: 'app-jumbo',
  templateUrl: './jumbo.component.html',
  styleUrls: ['./jumbo.component.scss']
})
export class JumboComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

	@ViewChild('send') send: ElementRef
	@ViewChild('get') get: ElementRef

  senders = [
    "Skrill (USD)",
    "Neteller (USD)",
    "Paypal (USD)",
    "Payoneer (USD)"
  ]

  receivers = [
    "Skrill (USD)",
    "Neteller (USD)",
    "Paypal (USD)",
    "Payoneer (USD)"
  ]

  pairs = [];

  ngOnInit() {
    for(let i = 0; i < this.senders.length; i++) {
      for(let n = 0; n < this.receivers.length; n++)
        this.pairs.push({
            pair:`${this.senders[i]}-${this.receivers[n]}`,
            tax:n+10
          })
    }
  }

  sendW: number = null;
  getW: number = null;
  pair: {};
  comissionN: number = null;

  tax: number = null;
  comission: number = null;
  receiver: number = null;
  sender: number = null;

	onKey(event: any) {
		this.sendW = this.renderer.selectRootElement(this.send).nativeElement.value;
		this.getW = this.renderer.selectRootElement(this.get).nativeElement.value;
    this.pair = `${this.sendW}-${this.getW}`
    this.tax = this.pairs
      .find( elems => elems.pair == this.pair )
      .tax;
    console.log(`Operación: envía: ${this.sendW}. recibe: ${this.getW}. Se cobra comisión de: ${this.tax}%`)
    this.comission = 1 - (1 / this.tax)
    this.comissionN = this.comission * this.tax
    setTimeout( () => {
      if (this.sender !== null) {
        this.receiver = this.sender * this.comission
        if (this.receiver !== null) {
        this.sender = this.receiver * this.comission
        return
        }
      }

    }, 1000)
    // if (this.sender == null || this.receiver == null ) {
    //     this.sender === 0
    //     this.receiver === 0
    // }

    // this.taxedN = event.target.value * (this.taxN/100) * this.rateN
    // console.log(`Se cobra una comisión de ${this.taxN}%, se utiliza un tipo de cambio de: ${this.rateN} y se obtiene una ganancia de: ${this.taxedN}`)
    // this.taxed = this.rateN * (1 - (this.taxN/100) )
    // this.result = event.target.value * this.taxed;
	}

}
