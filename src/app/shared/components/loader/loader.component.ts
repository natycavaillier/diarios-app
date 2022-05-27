import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  //Input property, ao usar <app-loader> é possível utlizar
  //<app-loader label="Carregando diarios..."></app-loader> 
  @Input() label: string = '';

  ngOnInit(): void {
  }

}
