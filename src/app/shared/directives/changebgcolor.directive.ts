import { Directive, ElementRef, HostBinding, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appChangebgcolor]'
})
export class ChangebgcolorDirective {

  constructor(private el: ElementRef, private render: Renderer2 ) { }

  @HostBinding('style.border') border: string;

  @HostListener('mouseleave') onMouseOver(){
    this.changeColor("red");
    this.border = "10px solid green";
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.changeColor("black");
  }

  @HostListener('click') onClick(){
    window.alert("Hello");
  }


  changeColor(color){
    this.render.setStyle(this.el.nativeElement, 'color',color)
  }

}
