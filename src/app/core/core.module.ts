import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    //Para utilizar o routerlink na navbar
    RouterModule
  ],
  // São os componentes, pipes etc que ficam "publicos"
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }

/** CORE MODULE
 * Guardas elementos de contexto global como serviços,
 * navbar, models e etc.
 */
