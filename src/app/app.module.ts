import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { Timeago } from '../pipes/timeago';

import { FeedService } from '../providers/feed-service';

import { AppTabsPage } from '../pages/app-tabs/app-tabs';
import { FeedListPage } from '../pages/feed-list/feed-list';
import { FeedDetailPage } from '../pages/feed-detail/feed-detail';
import { FeedSettingsPage } from '../pages/feed-settings/feed-settings';
import { FeedCreatePage } from '../pages/feed-create/feed-create';

@NgModule({
  declarations: [
    Timeago,
    MyApp,
    AppTabsPage,
    FeedListPage,
    FeedDetailPage,
    FeedSettingsPage,
    FeedCreatePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AppTabsPage,
    FeedListPage,
    FeedDetailPage,
    FeedSettingsPage,
    FeedCreatePage
  ],
  providers: [
    Storage,
    FeedService
  ]
})
export class AppModule {}
