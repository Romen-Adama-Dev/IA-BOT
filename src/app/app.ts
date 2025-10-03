// app.component.ts
import { Component, signal, inject, computed, effect } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule, MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LiquidEtherComponent } from './liquid-ether/liquid-ether.component';
import { LangService } from './services/lang.service';

type AppTheme = 'light' | 'gc-dark';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule, MatToolbarModule, MatButtonToggleModule, MatIconModule,
    MatButtonModule, LiquidEtherComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [{
    provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
    useValue: { appearance: 'standard', hideSingleSelectionIndicator: true, hideMultipleSelectionIndicator: true, disabledInteractive: false }
  }]
})
export class AppComponent {
  protected readonly title = signal('ia-bot');
  readonly lang = inject(LangService);

  // 1) arranca desde storage (o 'light' por defecto)
  private readonly initialTheme = (localStorage.getItem('theme') as AppTheme) || 'light';
  theme = signal<AppTheme>(this.initialTheme);

  // 2) cuando cambie el signal, actualiza <body> y guarda
  private readonly _applyTheme = effect(() => {
    const t = this.theme();
    const body = document.body.classList;
    body.remove('light', 'gc-dark');
    body.add(t);
    localStorage.setItem('theme', t);
  });

  // Paletas
  private readonly glamLight: string[] = ['#0B1F3B', '#6E1B2B', '#EFE5D3'];
  private readonly glamDark:  string[] = ['#D4C7A3', '#2E4A7D', '#1A1A1A'];

  palette = computed(() => this.theme() === 'light' ? this.glamLight : this.glamDark);
  bg = computed(() => this.theme() === 'light' ? 'rgba(255,255,255,0)' : 'rgba(8,12,20,0.36)');

  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'gc-dark' : 'light'));
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}