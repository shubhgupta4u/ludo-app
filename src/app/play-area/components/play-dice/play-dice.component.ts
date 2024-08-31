import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PlayerCode } from '../../models/player';
import { GameEventNotifierService } from '../../services/game-event-notifier.service';
import { EventName, GameEvent, PlayerThrownDiceEventData } from '../../models/game-event';
import { Subscription } from 'rxjs';
import {NativeAudio} from '@capacitor-community/native-audio'
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-play-dice',
  templateUrl: './play-dice.component.html',
  styleUrls: ['./play-dice.component.scss'],
})
export class PlayDiceComponent implements OnInit, OnDestroy {
  cube: any;
  min = 4;
  max = 12;
  @ViewChild('cube') cubeElement: ElementRef;
  @Input() player: PlayerCode = PlayerCode.Red;
  subscription: Subscription;
  isLocked=false;
  diceNumber:number=1;
  oldX:number=0;
  oldY:number=0;

  constructor(private gameEventNotifierService: GameEventNotifierService,
    private platform:Platform
  ) {
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
        this.playClickSound();
        this.changePlayer();
        this.isLocked=false;
      }
    })
    setTimeout(()=>{
      this.loadAudio();
    },100) ;    
  }
  loadAudio(){
    let diceaudioFilePath="dice.mp3";
    let clickaudioFilePath="click.mp3";
    if(this.platform.is('android') && !this.platform.is('mobileweb') &&  !this.platform.is('pwa')){
      diceaudioFilePath="public/assets/sounds/dice.mp3";
      clickaudioFilePath="public/assets/sounds/click.mp3";
    }
    NativeAudio.preload({
      assetId: "dice",
      assetPath: diceaudioFilePath,
      audioChannelNum: 1,
      isUrl: false
    });
    NativeAudio.preload({
      assetId: "click",
      assetPath: clickaudioFilePath,
      audioChannelNum: 1,
      isUrl: false
    });
  }
  private playClickSound() {
    NativeAudio.play({
      assetId: 'click',
    });
  }
  private playDiceSound() {
    NativeAudio.play({
      assetId: 'dice',
    });
  }
  private stopDiceSound() {
    NativeAudio.stop({
      assetId: 'dice',
    });
  }
  
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Method specifically for getting a random number between 1 and 6
  getRandom1To6(): number {
    return this.getRandomNumber(1, 6);
  }

  getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }
  getRandom2(max: number, min: number) {
    return 1 * 90;
  }
  diceclickhandler() {
    if(!this.isLocked){
      this.playDiceSound();
      this.isLocked=true;
      this.diceNumber = this.getRandom1To6();
      console.log(this.diceNumber);

      if(this.oldX == 0 && this.oldY ==0){
        this.cubeElement.nativeElement.style.webkitTransform = 'rotateX(' + 360 + 'deg) rotateY(' + 0 + 'deg)';
        this.cubeElement.nativeElement.style.transform = 'rotateX(' + 360 + 'deg) rotateY(' + 0 + 'deg)';
      }else{
        this.cubeElement.nativeElement.style.webkitTransform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg)';
        this.cubeElement.nativeElement.style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 + 'deg)';
      }    
      var xRand = this.getX(this.diceNumber);
      var yRand = this.getY(this.diceNumber);

      setTimeout(() => {
          this.cubeElement.nativeElement.style.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
          this.cubeElement.nativeElement.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
          this.oldX=xRand;
          this.oldY=yRand;
      }, 1000);
    
      setTimeout(() => {
        this.stopDiceSound();
        this.gameEventNotifierService.raiseEvent(new GameEvent(EventName.PlayerThrownDice, new PlayerThrownDiceEventData(this.player, this.diceNumber)));
      }, 2500);
    }
  }

  getX(diceNumber:number):number{
    switch(diceNumber){
      case 1: return 360;break;
      case 2: return 360;break;
      case 3: return 180;break; 
      case 4: return 180;break; 
      case 5: return 270;break; 
      case 6: return 90;break; 
    }
    return 360;
  }

  getY(diceNumber:number):number{
    switch(diceNumber){
      case 1: return 360;break;
      case 2: return 180;break; 
      case 3: return 450;break; 
      case 4: return 270;break; 
      case 5: return 270;break; 
      case 6: return 90;break; 
    }
    return 360;
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
