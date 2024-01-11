import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent {
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  symbol: any = "BTCUSDT";
  url: string = '';
  safeTradingViewUrl: any = '';
  safeTradingViewUrlETH: any = '';
  selectedValue: any = true;
  ngOnInit() {
    this.safeTradingViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=es#%7B%22symbol%22%3A%22CRYPTOCAP%3ABTC.D%22%2C%22frameElementId%22%3A%22tradingview_58df9%22%2C%22interval%22%3A%22D%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22materialbitcoin.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22CRYPTOCAP%3ABTC.D%22%2C%22page-uri%22%3A%22materialbitcoin.com%2Fblog%2Fdominancia-btc%2F%22%7D`);
    this.safeTradingViewUrlETH = this.sanitizer.bypassSecurityTrustResourceUrl(`https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=es#%7B%22symbol%22%3A%22CRYPTOCAP%3AETH.D%22%2C%22frameElementId%22%3A%22tradingview_58df9%22%2C%22interval%22%3A%22D%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22studies%22%3A%22%5B%5D%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22materialbitcoin.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22CRYPTOCAP%3AETH.D%22%2C%22page-uri%22%3A%22materialbitcoin.com%2Fblog%2Fdominancia-eth%2F%22%7D`);
  }

  checkEditTotal(value: string) {
    this.selectedValue = value === 'true' ? true : false;
  }
}
