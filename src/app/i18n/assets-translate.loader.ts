import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

@Injectable()
export class AssetsTranslateBrowserLoader implements TranslateLoader {
  constructor(private readonly http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(map(r => r || {}));
  }
}