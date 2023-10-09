import { Component } from '@angular/core';

@Component({
  selector: 'app-report-svg',
  templateUrl: './report.component.svg',
  styleUrls: ['./report.component.css']
})
export class ReportSvgComponent {
   fillColor = '#454745';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }
}