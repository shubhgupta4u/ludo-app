import { Component, Input, OnInit } from '@angular/core';
import { PlayerCode } from '../../models/player';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent  implements OnInit {
  @Input() player:PlayerCode =PlayerCode.Red;
  showBeacon=false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showBeacon = true;
    }, 200);
  }

}
