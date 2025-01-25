import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[pkmnBorderCard]' // modif de app par pkmn pour mieux comprendre
    ,
    standalone: true
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;
  private defaultWidth: number = 200; //
  private defaultDotted: string = '#009688'; //

  constructor(private el: ElementRef) { 
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
    this.setwidth(this.defaultWidth); //
  }

  @Input('pkmnBorderCard') borderColor: string; // alias
  //@Input () pkmnBorderCard: string; //  sans alias

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
    this.setwidth(this.defaultWidth + 50); //
    this.setDottedBorder(this.defaultDotted); //
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
    this.setwidth(this.defaultWidth); //
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setwidth(width: number) { //
    this.el.nativeElement.style.width = `${width}px`;
  }

  setDottedBorder(dotted: string) { //
    this.el.nativeElement.style.border = `dotted 4px ${dotted}`;
  }

}
