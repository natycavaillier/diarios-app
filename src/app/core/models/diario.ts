import { Converter } from "./converter";

export interface Diario {
    id?: string; // String aleatoria (atribuido pelo firestore)
    titulo: string;
    corpo: string;
    local: string;
    data: Date; //Data da viagem realizada
    imagem?: string; //Link da imagem
    //Serão preenchidas programaticamente
    createdAt: Date; //Guarda quando o diario foi criado
    usuarioId?: string;
    usuarioNick?: string;
    usuarioName?: string;
}

export const DiarioConverter: Converter<Diario> = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        // Extrai o objeto de dados do documento
        const obj = snapshot.data(options)!;

        return {
            ...obj, // Spread (Adiciona todas as propriedades de obj)
            data: obj['data']?.date(), // Converte de FirestoreDate para Date
            createdAt: obj['createdAt']?.date(),
        } as Diario;
    }
}