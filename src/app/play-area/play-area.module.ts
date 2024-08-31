import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayAreaRoutingModule } from './play-area-routing.module';
import { FinishZoneComponent } from './components/finish-zone/finish-zone.component';
import { LudoBoardComponent } from './components/ludo-board/ludo-board.component';
import { TokensPathComponent } from './components/tokens-path/tokens-path.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenComponent } from './components/token/token.component';
import { PlayDiceComponent } from './components/play-dice/play-dice.component';

@NgModule({
  declarations: [
    FinishZoneComponent,
    LudoBoardComponent,
    PlayerHomeComponent,
    TokensPathComponent,
    TokenComponent,
    PlayDiceComponent
  ],
  imports: [
    CommonModule,
    PlayAreaRoutingModule,
    IonicModule,
    FontAwesomeModule
  ]
})
export class PlayAreaModule { }
