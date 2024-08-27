import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ludo-board',
  templateUrl: './ludo-board.component.html',
  styleUrls: ['./ludo-board.component.scss'],
})
export class LudoBoardComponent  implements OnInit {

  constructor(private platform: Platform) { }

  ngOnInit() {}

}
