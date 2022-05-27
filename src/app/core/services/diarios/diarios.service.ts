import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, where } from '@angular/fire/firestore';
import { collection, doc, query } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {

  constructor(private db: Firestore, private authService: AuthService) { }

  //Referência a uma possível coleção do firestore
  //Precisa do conversor por conta das datas
  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getTodosDiarios(): Observable<Diario[]> {
    //Pega o id do documento e bota o valor na propriedade 'id' da interface
    return collectionData(this.diarios, { idField: 'id' });
  }

  getDiariosUsuario(): Observable<Diario[]> {
    return collectionData(
      //Query = busca
      query(this.diarios, where('usuarioId', '==', this.authService.uid)),
      { idField: 'id' }
    );
  }

  getDiarioById(id: string): Observable<Diario> {
    const diarioDoc = doc(this.diarios, id); //Indica o local do documento
    return docData(diarioDoc, { idField: 'id' });
  }

}
