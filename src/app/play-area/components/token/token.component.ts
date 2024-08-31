import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PlayerCode } from '../../models/player';
import { GameEventNotifierService } from '../../services/game-event-notifier.service';
import { EventName, GameEvent, PlayerMoveStartedEventData } from '../../models/game-event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent  implements OnInit , OnDestroy{
  @Input() player:PlayerCode =PlayerCode.Red;
  @Input() token:number =1
  showBeacon=false;
  subscription: Subscription;
  diceNumber:number|undefined;

  constructor(private gameEventNotifierService: GameEventNotifierService) { 
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.gameEventNotifierService.register().subscribe((e) => {
      if (e.name == EventName.PlayerThrownDice && e.data?.playerCode === this.player) {
        this.showBeacon = true;
        this.diceNumber = e.data?.diceNumber;
      } else if (e.name == EventName.PlayerMoveStarted) {
        this.showBeacon=false;
        this.diceNumber=undefined;
      }
    });
  }
  tokenMoveHandler(){
    if(this.showBeacon && this.diceNumber){
      this.gameEventNotifierService.raiseEvent(new GameEvent(EventName.PlayerMoveStarted,new PlayerMoveStartedEventData(this.player,this.diceNumber,this.token)));      
    }
  }
}
