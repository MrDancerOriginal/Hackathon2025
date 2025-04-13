import { Component, Input, Self } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() isPassword = 'bool';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  togglePassword(icon: HTMLImageElement): void {
    if (this.type === 'password') {
      this.type = 'text';
      icon.src = 'icons/eye.png';
      icon.className = 'h-[18px] w-[18px]';
    } else {
      this.type = 'password';
      icon.src = 'icons/close-eye.png';
      icon.className = 'h-4 w-4';
    }
  }
}
