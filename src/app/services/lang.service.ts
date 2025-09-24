import { Injectable, inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, DOCUMENT } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly doc = inject(DOCUMENT)
  private readonly storageKey = 'lang'
  readonly langs = ['es','en']
  readonly lang$ = new BehaviorSubject<string>('es')

  constructor(private readonly t: TranslateService){
    this.t.addLangs(this.langs)
    const saved = this.getSaved() ?? 'es'
    this.use(saved)
  }

  use(lang: string){
    this.t.use(lang)
    this.lang$.next(lang)
    this.save(lang)
    if (isPlatformBrowser(this.platformId)) this.doc.documentElement.lang = lang
  }

  current(){ return this.t.currentLang || this.t.defaultLang || 'es' }

  private save(lang: string){
    if (!isPlatformBrowser(this.platformId)) return
    localStorage.setItem(this.storageKey, lang)
  }
  private getSaved(){
    if (!isPlatformBrowser(this.platformId)) return null
    return localStorage.getItem(this.storageKey)
  }
}