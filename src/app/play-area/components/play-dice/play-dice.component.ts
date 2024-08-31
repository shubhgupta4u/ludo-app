import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerCode } from '../../models/player';
import { GameEventNotifierService } from '../../services/game-event-notifier.service';
import { EventName, GameEvent, PlayerThrownDiceEventData } from '../../models/game-event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-dice',
  templateUrl: './play-dice.component.html',
  styleUrls: ['./play-dice.component.scss'],
})
export class PlayDiceComponent implements OnInit, OnDestroy {
  cube: any;
  min = 1;
  max = 24;
  @ViewChild('cube') cubeElement: ElementRef;
  @Input() player: PlayerCode = PlayerCode.Red;
  subscription: Subscription;
  isLocked=false;

  constructor(private gameEventNotifierService: GameEventNotifierService) {
    this.cube = document.getElementById('cube');
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.subscription = this.gameEventNotifierService.register().subscribe((e) => {
      if (e.name == EventName.PlayerThrownDice) {
        this.isLocked=true;
      } else if (e.name == EventName.PlayerMoveStarted) {
        this.changePlayer();
        this.isLocked=false;
      }
    })
  }

  getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }
  getRandom2(max: number, min: number) {
    return 1 * 90;
  }
  diceclickhandler() {
    if(!this.isLocked){
      this.isLocked=true;
      var xRand = this.getRandom(this.max, this.min);
      var yRand = this.getRandom(this.max, this.min);
  
      this.cubeElement.nativeElement.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
      this.cubeElement.nativeElement.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
      setTimeout(() => {
        this.gameEventNotifierService.raiseEvent(new GameEvent(EventName.PlayerThrownDice, new PlayerThrownDiceEventData(this.player, 3)));
      }, 6000);
    }
  }

  changePlayer() {
    let newPlayer = (+this.player) + 1;
    switch (newPlayer) {
      case 1: this.player = PlayerCode.Red; break;
      case 2: this.player = PlayerCode.Green; break;
      case 3: this.player = PlayerCode.Yellow; break;
      case 4: this.player = PlayerCode.Blue; break;
      default: this.player = PlayerCode.Red; break;
    }
  }


}
