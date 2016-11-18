import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { FeedService } from '../providers/feed-service';

import { FeedListPage } from '../pages/feed-list/feed-list';

@NgModule({
  declarations: [
    MyApp,
    FeedListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedListPage
  ],
  providers: [
    FeedService
  ]
})
export class AppModule {}
