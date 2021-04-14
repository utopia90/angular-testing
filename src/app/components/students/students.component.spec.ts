import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StudentServiceStub } from 'src/app/mocks/student-service-stub.mock';
import { StudentService } from 'src/app/services/student.service';

import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports: [HttpClientModule],
      providers: [
        {
          // Hacer uso de una clase STUB del Servicio
          // para poder Mockear sus métodos
          // Cada vez que en el componente se haga referencia
          // a StudentService, realemente en el test
          // se ejecutará StudentServiceStub
          provide: StudentService,
          useClass: StudentServiceStub
        }
      ]
    })
      .compileComponents();

    // Realizamos la instancia del Componente antes de cada test
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Debería obtener una lista de estudiantes
  // En el NGOnInit del componente
  it('Debería obtener una lista de estudiantes en el NGOnInit', () => {
    /**
     * Vamos a espiar el método "getStudentList" del Servicio StudentService
     * Que realmente estará siendo suplantado por el StudentServiceStub
     *
     * Queremos que se llame a este método y termine, por lo que usamos
     * el callTrough() para asegurarnos de que el método se ejecuta y termina
     * correctamente
     */
    spyOn(component.service, 'getStudentList').and.callThrough();
    // Llamamos al ngOnInit del componente
    component.ngOnInit();
    // Verificamos que el método espiado ha sido llamado al menos una vez
    expect(component.service.getStudentList).toHaveBeenCalledTimes(1);
  });

  // Debería obtener una lista de Estudiantes con datos
  // Esta prueba es ASÍNCRONA y tenemos por lo tanto, que
  // asegurarnos de que se completa la petición al Servicio
  // antes de evaluar la respuesta
  it('Debería obtener una lista de Estudiantes con datos', async () => {
    /**
     * Primero esperamos a que el Fixture (nuestro componente)
     * esté estable (no esté realizando peticiones o esperando una respuesta)
     */
    fixture.whenStable().then(() => {
      expect(component.studentList.length).toBeGreaterThan(0);
    })
  });


  describe('Shallow Testing de Students Component', () => {

    // Debería renderizar los Estudiantes correctamente (SHALLOW)
    it('Debería renderizar los Estudiantes correctamente', () => {
      // Obtener el Elemento Nativo (DOM) del HTML donde está la
      // lista de estudiantes
      const e = fixture.debugElement
        .query(By.css('.student-list'))
        .nativeElement;

      // Una vez tenemos el elemento, verificamos sus nodos
      // (Los elementos que contiene, que será cada uno un Estudiante)
      // Verificamos que no esté vacío
      expect(e.childNodes[1].innerHtml).not.toBeNull();
      expect(e.childNodes[2].innerHtml).not.toBeNull();

      /**
       * Explicación de ChildNodes:
       * <ul>
       *  <li>childnode 1</li> --> buscamos estos elementos
       *  <li>childnode 2</li> --> buscamos este también
       * </ul>
       */

    });

    // El detalle del usuario debería estar vacío por defecto(SHALLOW)
    it('El detalle del usuario debería estar vacío por defecto', () => {
      // Obetenemos el elemento nativo del DOM en el que están los detalles del
      // estudiante seleccionado
      const e = fixture.debugElement.nativeElement.querySelector('#detalle');
      // Esperamos que está vacío, ya que no se ha realizado un evento click
      // en ningún estudiante previamente
      expect(e.innerHTML.trim()).toBe('. Pagado: 0€');
    });

    // Debería tener datos al pusar en un estudiante y
    // mostrar los detalles del mismo
    it('Debería tener datos al pusar en un estudiante y mostrar los detalles del mismo', () => {
      // Obtenemos los elementos del DOM que nos interesan:
      // El Estudiante 1
      // La sección donde se pondrán los detalles del Estudiante
      const e = fixture.debugElement.nativeElement.querySelector('#student-1');
      const eDetalles = fixture.debugElement.nativeElement.querySelector('#detalle');
      // Realizamos un CLICK en el Estudiante
      e.click();
      // Nos aseguramos que el componente activa el Detect Changes
      fixture.detectChanges();

      expect(eDetalles.innerHTML.trim()).toBe('Martín San José. Pagado: 1000€');
      expect(component.studentSelected.first_name)
        .toBe('Martín');
    });



  });













});
