import { ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing'; 

import { AvaliarComponent } from './avaliar.component';

describe('AvaliacaoComponent', () => {
  let component: AvaliarComponent;
  let fixture: ComponentFixture<AvaliarComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ AvaliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
