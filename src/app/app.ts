import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LiquidEtherComponent } from "./liquid-ether/liquid-ether.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LiquidEtherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('ia-bot');
}
