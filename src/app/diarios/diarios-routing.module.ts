import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';

const routes: Routes = [
  //pathMatch para entender que realmente é a raiz
  { path: '', redirectTo: 'diarios', pathMatch: 'full' },
  { path: 'diarios', component: DiarioListComponent },
  //Essa rota é dinamica
  { path: 'diarios/:id', component: DiarioDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiariosRoutingModule { }
