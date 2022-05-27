import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [ //Recursos que fazem parte de módulo (componentes,pipes,diretivas)
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }

/** SHARED MODULE
 * O uso do shared se destina a armazenar recursos usados com
 * frequência por outras partes da aplicação: pipes, diretivas, componentes
 */
