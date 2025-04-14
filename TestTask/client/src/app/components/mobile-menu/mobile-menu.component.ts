import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent  {
  // @ViewChild('menu') menu!: ElementRef;
  // @ViewChild('closeBtn') closeBtn!: ElementRef;

  // constructor(private renderer: Renderer2) {}

  // ngAfterViewInit() {
  //   this.setupMenuToggle();
  // }

  // private setupMenuToggle() {
  //   // Open menu
  //   this.renderer.listen(this.openBtn.nativeElement, 'click', () => {
  //     this.renderer.removeClass(this.menu.nativeElement, 'hidden');
  //     this.renderer.addClass(this.menu.nativeElement, 'flex');
  //     this.renderer.addClass(document.body, 'overflow-hidden');
      
  //     setTimeout(() => {
  //       this.renderer.removeClass(this.menu.nativeElement, 'translate-x-full');
  //       this.renderer.removeClass(this.menu.nativeElement, 'opacity-0');
  //       this.renderer.removeClass(this.menu.nativeElement, 'pointer-events-none');
  //     }, 50);
  //   });

  //   // Close menu
  //   this.renderer.listen(this.closeBtn.nativeElement, 'click', () => {
  //     this.renderer.addClass(this.menu.nativeElement, 'translate-x-full');
  //     this.renderer.addClass(this.menu.nativeElement, 'opacity-0');
  //     this.renderer.addClass(this.menu.nativeElement, 'pointer-events-none');
  //     this.renderer.removeClass(document.body, 'overflow-hidden');
      
  //     setTimeout(() => {
  //       this.renderer.removeClass(this.menu.nativeElement, 'flex');
  //       this.renderer.addClass(this.menu.nativeElement, 'hidden');
  //     }, 700);
  //   });
  // }
}

// implements AfterViewInit