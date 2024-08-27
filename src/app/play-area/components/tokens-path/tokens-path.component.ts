import { Component, Input, OnInit } from '@angular/core';
import { PlayerCode } from '../../models/player';
import { faStar} from '@fortawesome/free-regular-svg-icons';
import { faArrowDown,faArrowLeft,faArrowRight,faArrowUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tokens-path',
  templateUrl: './tokens-path.component.html',
  styleUrls: ['./tokens-path.component.scss'],
})
export class TokensPathComponent  implements OnInit {

  @Input() player:PlayerCode =PlayerCode.Red;
  cells:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  faStar=faStar;
  faArrowLeft=faArrowLeft;
  faArrowRight=faArrowRight;
  faArrowUp=faArrowUp;
  faArrowDown=faArrowDown;

  constructor() { }

  ngOnInit() {}
  getName(player:PlayerCode,index:number){
    return `cell-${PlayerCode[player]}-${index}`
  }
}
