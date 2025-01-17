import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-svg',
  templateUrl: './settings.component.svg',
  styleUrls: ['./settings.component.css']
})
export class SettingsSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}