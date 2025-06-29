import { Directive, ElementRef, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  private readonly el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
