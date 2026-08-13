import { Component, ContentChild, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @ViewChild('myview') myview!: ElementRef;
  @ContentChild('myContent') myContent!: ElementRef;

  ngAfterViewInit() {
    this.myview.nativeElement.style.color = 'red';
    this.myContent.nativeElement.style.color = 'blue';
  }
}
