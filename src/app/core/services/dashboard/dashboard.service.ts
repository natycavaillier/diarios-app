import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, limit, orderBy, query } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { Diario, DiarioConverter } from '../../models/diario';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private db: Firestore) { }

  diarios = collection(this.db, 'diarios').withConverter(DiarioConverter);

  getPostsCount(): Observable<number> {
    return collectionData(this.diarios)
      .pipe(
        //Quando chega no map a informação é o array
        map((diarios) => diarios.length)
      );
  }

  getLastPosts(): Observable<Diario[]> {
    const q = query(this.diarios,
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    return collectionData(q);
  }

  getCommonLocals() {
    return collectionData(this.diarios).pipe(map(this._commonLocals))
  }

  private _commonLocals(diarios: Diario[]) {
    const todosLocais = diarios.map(diario => diario.local);
    //o Set tira os valores repetidos e da os valores unicos
    const locais = new Set(todosLocais);

    const obj: {[x: string]: number} = {}

    locais.forEach((local) => {
      obj[local] = todosLocais.filter((loc) => loc === local).length;
    });

    return obj;
  }

}
