import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-svg',
  templateUrl: './admin.component.svg',
  styleUrls: ['./admin.component.css']
})
export class AdminSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}