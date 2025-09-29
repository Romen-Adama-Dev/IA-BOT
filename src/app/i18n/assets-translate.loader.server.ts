import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

@Injectable()
export class AssetsTranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from((async () => {
      const fs = await import('node:fs/promises');
      const path = await import('node:path');
      const file = path.join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
      const txt = await fs.readFile(file, 'utf8');
      return JSON.parse(txt);
    })());
  }
}