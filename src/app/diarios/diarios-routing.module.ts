import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiarioDetailComponent } from './components/diario-detail/diario-detail.component';
import { DiarioListComponent } from './components/diario-list/diario-list.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

//Configura uma guarda para redirecionar o usuário para /login
//caso ele não esteja logado
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  //pathMatch para entender que realmente é a raiz
  { path: '', redirectTo: 'diarios', pathMatch: 'full' },
  {
    path: 'diarios',
    component: DiarioListComponent,
    //Apenas quem tiver logado consegue acessar essa rota
    ...canActivate(redirectUnauthorizedToLogin),
  },
  //Essa rota é dinamica
  {
    path: 'diarios/:id',
    component: DiarioDetailComponent,
    //Apenas quem tiver logado consegue acessar essa rota
    ...canActivate(redirectUnauthorizedToLogin),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiariosRoutingModule { }
