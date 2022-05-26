import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]]
  });


  onSubmit() {
    const { email, senha } = this.loginForm.value;
    this.authService.loginEmail(email, senha)
    .pipe(
      this.toast.observe({
        success: 'Login efetuado',
        error: 'Um erro ocorreu',
        loading: 'Fazendo login...'
      })
    )
    .subscribe();
  }


  onLoginGoogle() {
    this.authService
    .loginGoogle()
    .pipe(
      this.toast.observe({
        success: 'Login efetuado',
        error: 'Um erro ocorreu',
        loading: 'Fazendo login...'
      })
    )
    .subscribe();
  }

  ngOnInit(): void { }

}