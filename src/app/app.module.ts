import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { FeedService } from '../providers/feed-service';

import { FeedListPage } from '../pages/feed-list/feed-list';
import { FeedDetailPage } from '../pages/feed-detail/feed-detail';

@NgModule({
  declarations: [
    MyApp,
    FeedListPage,
    FeedDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedListPage,
    FeedDetailPage
  ],
  providers: [
    FeedService
  ]
})
export class AppModule {}
