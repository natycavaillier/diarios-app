import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diario } from 'src/app/core/models/diario';

@Component({
  selector: 'app-diario-edit',
  templateUrl: './diario-edit.component.html',
  styleUrls: ['./diario-edit.component.scss']
})
export class DiarioEditComponent implements OnInit {

  constructor(
    //Objeto enviado no open {data: diario}
    @Inject(MAT_DIALOG_DATA) private data: Diario,
    private ref: MatDialogRef<DiarioEditComponent>
  ) { }

  //Guarda as informações do forms
  diario: Diario = {} as Diario;
  imagem?: File;

  setImage(ev: any) {
    // target é o input file
    this.imagem = ev.target.files[0];
  }

  onSubmit(){
    this.ref.close({diario: this.diario, imagem: this.imagem});
  }

  ngOnInit(): void {
    this.diario = this.data;
  }

}
