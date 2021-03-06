import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Pedometer } from '@ionic-native/pedometer/ngx';


/* The @auth0/angular-jwt dependency will automatically get access_token & append
 * it to the Authorization Header of any request that is made by the HTTPClient.
 *
 * Reference - Simon Grimm
 * https://www.youtube.com/watch?v=c79ZUM9zawc
 */
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => storage.get('access_token'),
    whitelistedDomains: ['localhost:4000']
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    Pedometer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
