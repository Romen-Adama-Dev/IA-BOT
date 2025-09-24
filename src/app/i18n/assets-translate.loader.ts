import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformServer } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Observable, from, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslateLoader } from '@ngx-translate/core'

@Injectable()
export class AssetsTranslateLoader implements TranslateLoader {
  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  getTranslation(lang: string): Observable<any> {
    if (isPlatformServer(this.platformId)) {
      return from(Promise.all([import('node:fs/promises'), import('node:path')]).then(async ([fs, path]) => {
        const file = path.join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`)
        const txt = await fs.readFile(file, 'utf8')
        return JSON.parse(txt)
      }))
    }
    return this.http.get(`assets/i18n/${lang}.json`).pipe(map(r => r || {}))
  }
}