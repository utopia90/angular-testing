import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  studentList: any[] = [];
  studentSelected = {
    first_name: '',
    last_name: '',
    email: ''
  };
  totalPagado: number = 0;

  newStudent:any[] = [];

  constructor(public service: StudentService) { }

  ngOnInit(): void {
    this.service.getStudentList().subscribe((response) => {
      console.log('Pedimos los estudiantes');
      this.studentList = response.data;
    });

    
    let body = {
      "name": "morpheus",
      "job": "leader"
  }
    this.service.saveUserAssociation(body).subscribe((response) => {
      console.log('añadimos estudiante nuevo');
      this.newStudent = response.data;
    });
  }

  /**
   * Método que sirve para obtener un estudiante por id
   * @param id del Estudiante a seleccionar
   */
  getDetails(id: number) {
    this.service.getStudent(id).subscribe((response) => {
      this.studentSelected = response.data;
      this.totalPagado = 1000;
    })
  }

}
