import { DocumentSnapshot } from "@angular/fire/firestore";

export interface Converter<T> {
    // Conversão antes de enviar para o firestore
    toFirestore(data: T): any;
    // Conversão quando recebe do firestore
    fromFirestore(snapshot: DocumentSnapshot, options: any): T;
}
