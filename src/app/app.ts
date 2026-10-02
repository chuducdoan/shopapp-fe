import { Component } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ReactiveFormsModule, FormsModule],
  template: `<app-layout></app-layout>`,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class App {
  
}
