import { Observable, of } from "rxjs";


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


export class StudentServiceStub {

  // Métodos simulados del StudentService

  // Obtener todos los estudiantes
  getStudentList(): Observable<any> {

    return of(stubStudentList);

  }

  // Obtener un estudiante por ID
  getStudent(id: string): Observable<any> {
    return of(stubStudentDetail);
  }




}
