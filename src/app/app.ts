import { Component, signal, inject } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonToggleModule, MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { LiquidEtherComponent } from './liquid-ether/liquid-ether.component'
import { LangService } from './services/lang.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule, MatToolbarModule, MatButtonToggleModule, MatIconModule, LiquidEtherComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    {
      provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
      useValue: { appearance: 'standard', hideSingleSelectionIndicator: true, hideMultipleSelectionIndicator: true, disabledInteractive: false }
    }
  ]
})
export class AppComponent {
  protected readonly title = signal('ia-bot')
  readonly lang = inject(LangService)
  scrollTo(id: string){ document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
}