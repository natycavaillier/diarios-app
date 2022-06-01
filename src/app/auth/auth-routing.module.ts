import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { UsuarioNaoVerificadoComponent } from './components/usuario-nao-verificado/usuario-nao-verificado.component';

const redirectLoggedIntoDiarios = () => redirectLoggedInTo(['/diarios']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedIntoDiarios)
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    ...canActivate(redirectLoggedIntoDiarios)
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
    ...canActivate(redirectLoggedIntoDiarios)
  },
  {
    path: 'confirmar-email',
    component: UsuarioNaoVerificadoComponent,
    ...canActivate(redirectLoggedIntoDiarios)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
