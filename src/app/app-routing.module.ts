import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RoomManagerComponent } from './views/room-manager/room-manager.component';
import { SliderComponent } from './views/slider/slider.component';
import { UpdaterComponent } from './views/updater/updater.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'updater',
    component: UpdaterComponent
  },
  {
    path: '',
    component: RoomManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
