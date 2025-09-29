import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

@Injectable()
export class AssetsTranslateServerLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Solo se compila/ejecuta en server build
    return from(Promise.all([import('node:fs/promises'), import('node:path')]).then(async ([fs, path]) => {
      const file = path.join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);
      const txt = await fs.readFile(file, 'utf8');
      return JSON.parse(txt);
    }));
  }
}