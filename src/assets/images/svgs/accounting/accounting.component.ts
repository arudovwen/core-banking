import { Component } from '@angular/core';

@Component({
  selector: 'app-accounting-svg',
  templateUrl: './accounting.component.svg',
  styleUrls: ['./accounting.component.css']
})
export class AccountingSvgComponent {
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}