import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        // Dado que App Component pinta el componente STUDENT
        // El módulo (testing) debe incoporarlo al igual que lo
        // haría el app.module.ts
        StudentsComponent
      ],
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-testing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-testing');
    expect(app.nombre).not.toContain('x');
  });

  // Shalow Testing (Prueba la renderización de elementos en la vista)
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // Necesitamos habilitar el Change Detection para que la vista esté actualizada
    fixture.detectChanges();
    const compiled = fixture.nativeElement; // el contenido del HTML
    // .content (class) --> <span></span>
    expect(compiled.querySelector('.content span')
      .textContent).toContain('angular-testing ejecutando correctamente');
  });
});
