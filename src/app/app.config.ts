import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { AssetsTranslateLoader } from './i18n/assets-translate.loader'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: AssetsTranslateLoader,
          deps: [HttpClient]
        },
        fallbackLang: 'es'
      })
    )
  ]
}