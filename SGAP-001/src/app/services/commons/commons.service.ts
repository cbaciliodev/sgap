import { Injectable } from '@angular/core';
import { isEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }

  isEmpty( value ){
    return (typeof value == 'undefined' || value==null);
  }

  assertNotEmpty( value, message ){
    if( this.isEmpty( value ) ){
      throw ( new Error( this.isEmpty(message) ? 'Error empty value' : message) );
    }
  }
}
