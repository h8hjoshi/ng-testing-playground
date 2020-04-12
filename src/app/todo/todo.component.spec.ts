import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActivatedRouteStub } from 'src/test/activated-route-stub';
import { TodoService } from '../services/todo.service';
import { TodoComponent } from './todo.component';
import { Todo } from '../model/todo';


let activatedRoute: ActivatedRouteStub;
let component: TodoComponent;
let fixture: ComponentFixture<TodoComponent>;
const dummyTodo: Todo = { id: 1, title: "Dummy Todo", completed: false, notes: "My dummy notes" };

describe('TodoComponent specs', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  describe('Using a service stub', stubbingServices);
  describe('Using a mock/spy service', spyServices)
});

function stubbingServices() {
  let todoServiceStub: Partial<TodoService> = {
    findById: id => {
      return dummyTodo
    },
    markAsComplete: (id, flag) => { }
  };

  let activatedRouteStub: Partial<ActivatedRoute> = {
    paramMap: of(convertToParamMap({ "id": 1 })).pipe(delay(2000))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
      .compileComponents();

    createComponent();
  }));

  it('shows the correct todo item', () => {
    expect(component.todo).toEqual(dummyTodo);
    const completed = component.todo.completed;
    component.toggle();
    expect(component.todo.completed).toBe(!completed);
  });
}

function spyServices() {
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async(() => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['findById', 'markAsComplete']);
    todoServiceSpy.findById.and.returnValue(dummyTodo);
    activatedRoute.setParamMap({ "id": 1 });

    TestBed.configureTestingModule(
      {
        declarations: [TodoComponent],
        providers: [
          //when overriding component
          // { provide: TodoService, useValue: {} },
          { provide: TodoService, useValue: todoServiceSpy },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ]
      })
      //FIXME when a component declares its own providers, use overrideComponent to inject spy service
      // .overrideComponent(TodoComponent, {
      //   set: {
      //     providers: [
      //       { provide: TodoService, useValue: todoServiceSpy }
      //     ]
      //   }
      // })
      .compileComponents();

    createComponent();
  }));

  it('shows the correct todo item - 2', () => {
    expect(todoServiceSpy.findById).toHaveBeenCalled();
    expect(component.todo).toEqual(dummyTodo);
    const completed = component.todo.completed;

    //Verify the DOM
    const el: HTMLElement = fixture.nativeElement;
    const div = el.querySelector('.todo');
    expect(div).toBeTruthy();

    expect(div.querySelector('.title').textContent.trim()).toEqual(dummyTodo.title);
    expect(div.querySelector('.markCompleted').textContent.trim()).toContain('Mark as complete?');
    expect(div.querySelector('.notes').textContent.trim()).toEqual(dummyTodo.notes);

    //Check toggle
    component.toggle();
    expect(component.todo.completed).toBe(!completed);
  });

  it('a null item', () => {
    todoServiceSpy.findById.and.returnValue(null);

    createComponent();

    expect(todoServiceSpy.findById).toHaveBeenCalled();
    expect(component.todo).toEqual(null);

    const el: HTMLElement = fixture.nativeElement;
    const div = el.querySelector('.todo');
    expect(div).toBeFalsy();
  });
}

function createComponent() {
  fixture = TestBed.createComponent(TodoComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
  });
}
