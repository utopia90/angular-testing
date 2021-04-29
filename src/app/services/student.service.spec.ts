import { getTestBed, TestBed } from '@angular/core/testing';

// Imports para poder hacer uso de HTTP en tests
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StudentService } from './student.service';


// FAKE DATA para las pruebas HTTP
const stubStudentList = {
  data: [
    {
      id: 1,
      first_name: 'Martín',
      last_name: 'San José',
      email: 'martin@imaginagroup.com'
    },
    {
      id: 2,
      first_name: 'Andrés',
      last_name: 'García',
      email: 'andres@imaginagroup.com'
    },
    {
      id: 3,
      first_name: 'Anabel',
      last_name: 'Fernández',
      email: 'anabel@imaginagroup.com'
    }
  ]
}

const stubStudentDetail = {
  data: {
    id: '1',
    first_name: 'Martín',
    last_name: 'San José',
    email: 'martin@imaginagroup.com'
  }
}


describe('StudentService', () => {
  // Declarar las variables que vamos a usar en este Test Suite (describe)
  let service: StudentService;
  let injector: TestBed;
  let httpMock: HttpTestingController; // permite hacer peticiones HTTP simuladas

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [StudentService]
    });

    // Inicialización de las variables antes de cada test
    // Obtener el testBed y lo guardamos en injector en el que
    // guardamos toda la configuración del TestingModule
    injector = getTestBed();
    service = injector.inject(StudentService); // injectarlo como provider
    httpMock = injector.get(HttpTestingController);
  });

  // Después de Cada Test verificamos que se haya usado el httpMock
  afterEach(() => {
    httpMock.verify(); // Limpia y verifica las peticiones restantes tras cada test
  })

  it('El servicio de Estudiantes se crea correctamente', () => {
    expect(service).toBeTruthy();
  });

  // Debería devolver la lista de estudiantes
  it('Debería devolver la lista de estudiantes', () => {
    // En este test vamos a probar que se obtengan los la lista de estudiantes
    // a través del método "getStudentList"
    service.getStudentList().subscribe((response) => {
      // Cuando se haya hecho el FLUSH de httpMock
      expect(response).toEqual(stubStudentList);
    })

    /**
     * Configuramos la petición simulada de HTTP
     * Comprobamos que la petición se haya hecho a la URL correcta
     * Además, comprobamos que el método haya sido GET
     *
     * Finalmente, devolvemos la lista de Estudiantes simulada
     * para que se resuelva el Observable y entre en el Subscribe
     */
    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(stubStudentList);

  });


  // Debería devolver el detalle de un estudiante por ID
  it('Debería devolver el detalle de un estudiante por ID', () => {

    service.getStudent(1).subscribe((response) => {
      expect(response).toEqual(stubStudentDetail);
    })

    /**
     * Configuramos la petición simulada de HTTP
     * Comprobamos que la petición se haya hecho a la URL correcta
     * Además, comprobamos que el método haya sido GET
     *
     * Finalmente, devolvemos la el Detalle del Estudiante simulado
     * para que se resuelva el Observable y entre en el Subscribe
     */
     const req = httpMock.expectOne('https://reqres.in/api/users/1');
     expect(req.request.method).toBe('GET');
     req.flush(stubStudentDetail);


  });

  it('saveUserAssociation() should POST and return data', () => {

     
    let body = {
      "name": "morpheus",
      "job": "leader"
  }
    service.saveUserAssociation(body).subscribe((res) => {
      expect(res).toEqual(body);
    });

    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('POST');
    req.flush(body);
  });






});
