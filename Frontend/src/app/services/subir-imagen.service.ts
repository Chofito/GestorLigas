import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {
  public url: string;

  constructor() {
    this.url = GLOBAL.url;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {//peticion de subida de archivos
    return new Promise((resolve,reject) => {
      let formData = new FormData(); // tipo de datos del archivo 
      let xhr = new XMLHttpRequest();

      for (var i=0; i< files.length; i++){
        formData.append(name, files[i], files[i].name); // abre el archivo con su nombre, busca la posicion,y luego el nombre de la posicion
      }

      xhr.onreadystatechange = () => { // esto sucede cuando el objeto cambie o este listo
        if (xhr.readyState === 4) { // verifica que todo este de manera correcta
          if (xhr.status === 200) { // si entra es que todo esta corrrecto
            resolve(JSON.parse(xhr.response)); // parseamos la respuesta a un archivo json
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true); // le decimos que trabaje de forma asincrone y en que metodo
      xhr.send(formData);
    });
  }
}
