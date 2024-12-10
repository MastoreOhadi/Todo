import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TaskService} from "./app/task.service";
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
  providers: [

    importProvidersFrom(BrowserModule),
    ...appConfig.providers,
    provideAnimations(),


  TaskService,
    { provide: 'initialId', useValue: 1 }, // مقدار ثابت برای initialId
    { provide: 'localStorageKey', useValue: 'tasks' } // مقدار ثابت برای localStorageKey

]
}).catch((err) => console.error(err));
