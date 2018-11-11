import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logger } from '@app/core';

const log = new Logger('BaseRest');

/**
 * Basado en los endpoints de sailsjs
 * https://sailsjs.com/documentation/reference/blueprint-api
 *
 * @export
 * @class BaseRest
 */
export class BaseRest {
  /**
   * Creates an instance of BaseRestApi.
   * @param {HttpClient} http instanciaHttpClient
   * @param {string} endPoint endPoint de la apiRest ejemplo: factura
   * @memberof BaseRest
   */
  constructor(private http: HttpClient, private endPoint: string) {}

  /**
   * https://sailsjs.com/documentation/reference/blueprint-api/create
   *
   * @template T Modelos
   * @param {T} model modelo a crear ejemplo Factura
   * @returns {Observable<Object>} retorna lo que la api de crear
   * @memberof BaseRest
   */
  create<T>(model: T): Observable<Object> {
    return this.http.post(this.endPoint, model);
  }

  /**
   * https://sailsjs.com/documentation/reference/blueprint-api/destroy
   *
   * @template T
   * @param {T} model modelo a ser eliminado
   * @returns {Observable<Object>} retorna la api de elemento eliminado
   * @memberof BaseRest
   */
  destroy<T>(model: T): Observable<Object> {
    return this.http.delete(this.endPoint + '/' + model['id']);
  }

  /**
   * https://sailsjs.com/documentation/reference/blueprint-api/find-one
   *
   * @param {string} id identificador de objeto
   * @returns {Observable<Object>} retorna la api de busqueda de un unico elemento
   * @memberof BaseRest
   */
  findOne(id: string): Observable<Object> {
    return this.http.get(this.endPoint + '/' + id);
  }

  /**
   * * https://sailsjs.com/documentation/reference/blueprint-api/find-where
   *
   * @param [opciones] modificadores de busqueda waterline query language
   * @returns {Observable<Object>} api de busqueda
   * @memberof BaseRest
   */
  findWhere(opciones?: { limit?: number; where?: string; sort?: string }): Observable<Object> {
    let queryParams = '?';

    for (const key in opciones) {
      if (opciones.hasOwnProperty(key)) {
        const value = opciones[key];
        queryParams = queryParams + key + '=' + value;
      }
    }

    if (queryParams.length === 1) {
      queryParams = '';
    }

    return this.http.get(this.endPoint + queryParams);
  }

  /**
   * https://sailsjs.com/documentation/reference/blueprint-api/update
   *
   * @param {T} model debe contener el id a actualizar
   * @returns {Observable<Object>} api para actualizacion
   * @memberof BaseRest
   */
  update<T>(model: T): Observable<Object> {
    return this.http.patch(this.endPoint + '/' + model['id'], model);
  }
}
