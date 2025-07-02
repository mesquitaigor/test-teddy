import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '@teddy/auth';
import { Component } from '@angular/core';

import { App } from './app';


@Component({
  selector: 'app-header',
  template: '<div>Header</div>'
})
class MockAppHeaderComponent { }

describe(App.name, () => {
  let mockUserService: Partial<UserService>;
  let mockRouter: Partial<Router>;
  let routerEventsSubject: Subject<NavigationEnd>;

  beforeEach(async () => {
    const userSubject = new BehaviorSubject<string | null>(null);
    routerEventsSubject = new Subject<NavigationEnd>();

    mockUserService = {
      user$: userSubject,
      identifyUser: jest.fn()
    };

    mockRouter = {
      events: routerEventsSubject.asObservable(),
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), App, MockAppHeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .overrideProvider(UserService, { useValue: mockUserService })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not show header when user is not identified', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    // Simular NavigationEnd para uma rota diferente da raiz
    routerEventsSubject.next(new NavigationEnd(1, '/clients', '/clients'));
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).toBeNull();
    expect(fixture.componentInstance.showHeader).toBe(false);
  }));

  it('should show header when user is identified and not on root route', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    // Identificar usuário
    (mockUserService.user$ as BehaviorSubject<string | null>).next('John Doe');
    fixture.detectChanges();
    // Simular NavigationEnd para uma rota diferente da raiz
    routerEventsSubject.next(new NavigationEnd(1, '/clients', '/clients'));
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).not.toBeNull();
    expect(fixture.componentInstance.showHeader).toBe(true);
  }));

  it('should not show header when user is identified but on root route', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    // Identificar usuário
    (mockUserService.user$ as BehaviorSubject<string | null>).next('John Doe');
    fixture.detectChanges();
    // Simular NavigationEnd para a rota raiz
    routerEventsSubject.next(new NavigationEnd(1, '/', '/'));
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).toBeNull();
    expect(fixture.componentInstance.showHeader).toBe(false);
  }));

  it('should hide header when user logs out', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    // Identificar usuário primeiro
    (mockUserService.user$ as BehaviorSubject<string | null>).next('John Doe');
    fixture.detectChanges();
    // Simular NavigationEnd para uma rota diferente da raiz
    routerEventsSubject.next(new NavigationEnd(1, '/clients', '/clients'));
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.showHeader).toBe(true);

    // Fazer logout do usuário
    (mockUserService.user$ as BehaviorSubject<string | null>).next(null);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('app-header');
    expect(header).toBeNull();
    expect(fixture.componentInstance.showHeader).toBe(false);
  }));
});
