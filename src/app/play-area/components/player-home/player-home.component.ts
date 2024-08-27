import { Component, Input, OnInit } from '@angular/core';
import { PlayerCode } from '../../models/player';

@Component({
  selector: 'app-player-home',
  templateUrl: './player-home.component.html',
  styleUrls: ['./player-home.component.scss'],
})
export class PlayerHomeComponent  implements OnInit {

  @Input() player:PlayerCode =PlayerCode.Red;
  constructor() { }

  ngOnInit() {}
 
}
