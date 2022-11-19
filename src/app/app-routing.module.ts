import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { IndustryComponent } from './industry/industry.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      {path: 'Indusrties', component: IndustryComponent},
      {path: 'Devices', component: DeviceComponent},
      {path: '', component: IndustryComponent},
      {path: '**', component: IndustryComponent},
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
