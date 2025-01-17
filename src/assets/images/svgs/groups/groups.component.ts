import { Component } from '@angular/core';

@Component({
  selector: 'app-groups-svg',
  templateUrl: './groups.component.svg',
  styleUrls: ['./groups.component.css']
})
export class GroupsSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}