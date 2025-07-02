import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserService } from '@teddy/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserIdentificationComponent } from './user-identification.component';


// Mock do TeddyButtonComponent
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-teddy-button',
  template: '<button [disabled]="disabled" (click)="buttonClick.emit()"><ng-content></ng-content></button>'
})
class MockTeddyButtonComponent {
  size = '';
  fill = false;
  disabled = false;
  buttonClick = { emit: jest.fn() };
}

describe(UserIdentificationComponent.name, () => {
  let component: UserIdentificationComponent;
  let fixture: ComponentFixture<UserIdentificationComponent>;
  let mockUserService: Partial<UserService>;
  let mockRouter: Partial<Router>;
  let alertSpy: jest.SpyInstance;

  beforeEach(async () => {
    const userSubject = new BehaviorSubject<string | null>(null);

    mockUserService = {
      user$: userSubject,
      identifyUser: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => undefined);

    await TestBed.configureTestingModule({
      imports: [UserIdentificationComponent, MockTeddyButtonComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable button when user is empty', () => {
    component.user = '';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('lib-teddy-button'));
    expect(button.componentInstance.disabled).toBe(true);
  });

  it('should enable button when user has value', () => {
    component.user = 'João';
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('lib-teddy-button'));
    expect(button.componentInstance.disabled).toBe(false);
  });

  describe('handleEntry', () => {
    it('should show alert when user is empty', () => {
      component.user = '';
      component.handleEntry();
      expect(alertSpy).toHaveBeenCalledWith('Digite seu nome');
      expect(mockUserService.identifyUser).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should show alert when user is only whitespace', () => {
      component.user = '';
      component.handleEntry();
      expect(alertSpy).toHaveBeenCalledWith('Digite seu nome');
      expect(mockUserService.identifyUser).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should call userService.identifyUser and navigate when user is valid', () => {
      component.user = 'João Silva';
      component.handleEntry();
      expect(alertSpy).not.toHaveBeenCalled();
      expect(mockUserService.identifyUser).toHaveBeenCalledWith('João Silva');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
    });

    it('should trim user name before processing', () => {
      component.user = '  João Silva  ';
      component.handleEntry();
      expect(mockUserService.identifyUser).toHaveBeenCalledWith('  João Silva  ');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
    });
  });

  it('should call handleEntry when button is clicked', () => {
    const handleEntrySpy = jest.spyOn(component, 'handleEntry');
    component.user = 'João';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('lib-teddy-button button');
    button.click();
    expect(handleEntrySpy).toHaveBeenCalled();
  });

  it('should have autofocus directive on input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[appAutofocus]');
    expect(input).toBeTruthy();
  });

  it('should update button disabled state when user value changes', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('lib-teddy-button'));
    const buttonInstance = buttonDebugElement.componentInstance as MockTeddyButtonComponent;
    expect(buttonInstance.disabled).toBe(true);
    component.user = 'Test';
    fixture.detectChanges();
    expect(buttonInstance.disabled).toBe(false);
    component.user = '';
    fixture.detectChanges();
    expect(buttonInstance.disabled).toBe(true);
  });
});
