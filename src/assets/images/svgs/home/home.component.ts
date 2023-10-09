import { Component } from '@angular/core';

@Component({
  selector: 'app-home-svg',
  templateUrl: './home.component.svg',
  styleUrls: ['./home.component.css']
})
export class HomeSvgComponent {
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}