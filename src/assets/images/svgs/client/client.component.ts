import { Component } from '@angular/core';

@Component({
  selector: 'app-client-svg',
  templateUrl: './client.component.svg',
  styleUrls: ['./client.component.css']
})
export class ClientSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}