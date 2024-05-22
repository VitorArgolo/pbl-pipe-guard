import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');

    if (value.length <= 10) {
      input.value = this.formatPhone(value);
    } else {
      input.value = this.formatMobilePhone(value);
    }
  }

  formatPhone(value: string): string {
    const areaCode = value.slice(0, 2);
    const firstPart = value.slice(2, 6);
    const secondPart = value.slice(6, 10);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }

  formatMobilePhone(value: string): string {
    const areaCode = value.slice(0, 2);
    const firstPart = value.slice(2, 7);
    const secondPart = value.slice(7, 11);
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }
}
