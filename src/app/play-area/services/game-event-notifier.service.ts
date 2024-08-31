import { Injectable } from '@angular/core';
import { PlayerCode } from '../models/player';
import { Subject } from 'rxjs';
import { EventName, GameEvent, PlayerThrownDiceEventData } from '../models/game-event';

@Injectable({
  providedIn: 'root'
})
export class GameEventNotifierService {

  private subject = new Subject<GameEvent>();
  private lastPlayerDiceMoveData:PlayerThrownDiceEventData|undefined;

  constructor() { }

  raiseEvent(event:GameEvent){
    if(event.name === EventName.PlayerThrownDice){
      this.lastPlayerDiceMoveData=event.data;
    }
    this.subject.next(event);
  }
  register(){
    return this.subject;
  }
  getLastPlayedPlayer():PlayerCode|undefined{
    return this.lastPlayerDiceMoveData !== undefined ?this.lastPlayerDiceMoveData.playerCode:undefined;
  }
  getLastPlayedPlayerDiceNumber():number|undefined{
    return this.lastPlayerDiceMoveData !== undefined ?this.lastPlayerDiceMoveData.diceNumber:undefined;
  }
}
