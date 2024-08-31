import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-play-dice',
  templateUrl: './play-dice.component.html',
  styleUrls: ['./play-dice.component.scss'],
})
export class PlayDiceComponent  implements OnInit {
  cube:any; 
  min = 1;
  max = 24;
  @ViewChild('cube') cubeElement:ElementRef; 

  constructor() {
    this.cube=document.getElementById('cube');
   }

  ngOnInit() {}

  getRandom(max:number, min:number) {
    return (Math.floor(Math.random() * (max-min)) + min) * 90;
  }

  diceclickhandler(){
    var xRand = this.getRandom(this.max, this.min);
    var yRand = this.getRandom(this.max, this.min);
      
    this.cubeElement.nativeElement.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    this.cubeElement.nativeElement.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
  }


}
