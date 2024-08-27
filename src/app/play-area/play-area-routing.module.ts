import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LudoBoardComponent } from './components/ludo-board/ludo-board.component';

const routes: Routes = [
  {
    path: '',
    component:LudoBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayAreaRoutingModule { }
