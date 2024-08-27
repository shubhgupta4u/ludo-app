import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayAreaRoutingModule } from './play-area-routing.module';
import { FinishZoneComponent } from './components/finish-zone/finish-zone.component';
import { LudoBoardComponent } from './components/ludo-board/ludo-board.component';
import { TokensPathComponent } from './components/tokens-path/tokens-path.component';
import { PlayerHomeComponent } from './components/player-home/player-home.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FinishZoneComponent,LudoBoardComponent,PlayerHomeComponent,TokensPathComponent],
  imports: [
    CommonModule,
    PlayAreaRoutingModule,
    IonicModule,
    FontAwesomeModule
  ]
})
export class PlayAreaModule { }
