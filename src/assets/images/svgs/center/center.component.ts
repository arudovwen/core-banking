// @ts-nocheck 
import { Component } from '@angular/core';

@Component({
  selector: 'app-center-svg',
  templateUrl: './center.component.svg',
  styleUrls: ['./center.component.css']
})
export class CenterSvgComponent {
  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}