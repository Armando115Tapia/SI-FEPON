import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud-factura',
  templateUrl: './crud-factura.component.html',
  styleUrls: ['./crud-factura.component.scss']
})
export class CrudFacturaComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http
      .get('factura')
      .subscribe(data => console.log(data), error => console.log(error));
  }

  ngOnInit() { }
}
