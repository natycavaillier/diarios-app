import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: Storage) { }

  private createFileName(file: File): string {
    //Pop pega o ultimo elemento e tira do array(nesse caso é o jpg)
    const ext = file.name.split('.').pop(); //jpg
    //Date.now é o tempo em milissegundos desde 1970 (acho)
    //O math.random * 1000 quer dizer que vao numeros randomicos sem nunca chegar em
    //1000, e arredondamos para baixo para dar um valor inteiro
    //Estamos fazendo isso para diminuir ainda mais a chance de duas pessoas
    //Fazerem upload ao mesmo tempo com o mesmo nome
    const name = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return `${name}.${ext}`; // 2131231231312312312.jpg
  }

  //Folder indica a pasta para salvar o file
  //Folder pode ser /diarios/fx125/
  //Retorna o link da imagem
  upload(file?: File, folder?: string): Observable<string | null> {
    if (file) {
      const filename = this.createFileName(file);
      //ref -> função para referenciar um arquivo remoto
      const fileRef = ref(this.storage, folder + filename); // Ex:  /diarios/fx125/12345.jpg
      return from(uploadBytes(fileRef, file)).pipe(
        //Pega a informação emitida e emite um novo observable
        //O upload é realizado e depois o link é solicitado
        switchMap(() => from(getDownloadURL(fileRef))) // o upload é realizado e depois o link é solicitado
      );
    } else {
      //Retorna observable de nulo
      //Não ocorre upload
      return of(null); // não ocorre upload
    }
  }

}
