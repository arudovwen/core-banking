import { Component } from '@angular/core';

@Component({
  selector: 'app-self-service-svg',
  templateUrl: './self-service.component.svg',
  styleUrls: ['./self-service.component.css']
})
export class SelfServiceSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}