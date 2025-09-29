import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AssetsTranslateServerLoader } from './i18n/assets-translate.loader.server';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNoopAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: AssetsTranslateServerLoader
        },
        fallbackLang: 'es'
      })
    )
  ]
};