import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config.server';
import 'zone.js/node'

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, appConfig, context);

export default bootstrap;
