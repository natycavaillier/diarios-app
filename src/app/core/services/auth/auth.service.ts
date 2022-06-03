import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { collection, doc } from '@firebase/firestore';
import { first, from, map, switchMap, tap } from 'rxjs';

// Firebase Versão Modular
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // Serviços do firebase authentication
    private auth: Auth,
    //Serviços de banco firestore do firebase
    private db: Firestore,
    // Mudar de rota de forma imperativa
    private router: Router
  ) { }



  //Guarda o id único do usuario logado
  uid?: string;

  //O get faz com que o logged se comporte como propriedade e não como método
  //Ou seja, não precisa chamar com '()' depois
  get logged() {
    //Se é null, o usuario está deslogado
    return authState(this.auth).pipe(
      tap((user) => {
        //Conforme o usuario loga/desloga é atualizado o valor de id
        this.uid = user?.uid
      })
    );
  }

  get userData() {
    // Referencia o documento do usuário logado
    const userDoc = doc(this.usuarios, this.uid);
    // "Pega" apenas a primeira amostra de dados e encerra o observable
    return docData(userDoc).pipe(first());
  }

  get isAdmin() {
    return authState(this.auth).pipe( // busca dados do auth do usuario logado
      first(), // recebe apenas a primeira info
      switchMap((user: any) => { // emite um novo obs com base no user
        const userDoc = doc(this.usuarios, user?.uid);
        return docData(userDoc).pipe(first()); // verifica o documento no banco 
      }),
      map((user) => user['isAdmin'] === true) /* verifica se o user logado possui a propriedade*/
    );
  }

  usuarios = collection(this.db, 'usuarios'); // Referencia possivel coleção no firestore

  signupEmail(email: string, password: string, nome: string, nick: string) {
    // Se comunica com o auth e cria um usuário a partir do email e senha
    // Pode ocorrer erros, por isso é importante retornar o observable
    // para monitorar o ocorrido
    return from(createUserWithEmailAndPassword(this.auth, email, password)
      //Só passa pro pipe se forem emitidas informações válidas
    ).pipe(
      //Cdadastro deu certo
      tap((creds) => {
        // Informações do usuario logado
        const user = creds.user;
        //Referencia um documento de usuario no firestore
        const userDoc = doc(this.usuarios, user.uid);
        setDoc(userDoc, {
          uid: user.uid,
          email: email,
          nome: nome,
          nick: nick
        });

        this.emailVerificacao(creds.user);
      })
    );
  }

  loginEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((creds) => {
        this.emailVerificacao(creds.user);
      })
    );
  }

  logout(rota: '/login' | '/confirmar-email') {
    // Desloga o usuario e ao final
    // navega para uma rota determinada
    return from(this.auth.signOut()).pipe(
      tap(() => {
        this.router.navigate([rota]);
      }));
  }

  emailVerificacao(user: any) {
    if (!user.emailVerified) {
      sendEmailVerification(user);
      this.logout('/confirmar-email').subscribe();
    } else {
      this.router.navigate(['/']);
    }
  }

  loginGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      tap((creds) => {
        const user = creds.user;
        const userDoc = doc(this.usuarios, user.uid);

        // updateDoc faz uma atualização parcial = atualiza apenas o que está diferente
        // no doc do firebase
        setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          // 'displayName' contém o nome do usuário do google
          nome: user.displayName,
          nick: 'Um usuário do Google'
        });

        this.router.navigate(['/']);
      })
    );
  }

  recoverPassword(email: string) {
    // Com base no email do parametro, envia um email para o usuario
    // redefinir/resetar a senha
    return from(sendPasswordResetEmail(this.auth, email));
  }

}
