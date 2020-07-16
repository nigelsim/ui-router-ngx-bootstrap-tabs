import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterTabDirective } from './router-tab.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { UIRouterModule, Ng2StateDeclaration } from '@uirouter/angular';
import { HomeComponent } from './home/home.component';

const APP_STATES: Ng2StateDeclaration[] = [
  {
    name: 'landing',
    url: '/',
    redirectTo: { state: 'home', params: { tab: 'tab1' } },
  },
  {
    name: 'home',
    url: '/:tab',
    dynamic: true,
    component: HomeComponent
  },
];

@NgModule({
  declarations: [AppComponent, RouterTabDirective, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),

    UIRouterModule.forRoot({
      states: APP_STATES,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
