import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumberDirective {
  constructor(private _el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', 'NumLock', 'ArrowLeft', 'ArrowRight', 'End', 'Home', '.'].indexOf(e.key) !== -1 ||
      // Allow: Ctrl+A
      (e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.key === 'x' && (e.ctrlKey || e.metaKey))) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key) === -1)) {
      e.preventDefault();
    }
  }

}