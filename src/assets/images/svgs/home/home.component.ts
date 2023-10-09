import { Component, Input } from "@angular/core";

@Component({
  selector: "app-home-svg",
  templateUrl: "./home.component.svg",
  styleUrls: ["./home.component.css"],
})
export class HomeSvgComponent {
  @Input('fillColor') fillColor: string = '#454745';
  
}
