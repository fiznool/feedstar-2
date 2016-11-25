import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedListPage } from '../feed-list/feed-list'
import { FeedSettingsPage } from '../feed-settings/feed-settings'

@Component({
  selector: 'page-app-tabs',
  templateUrl: 'app-tabs.html'
})
export class AppTabsPage {
  tab1Root = FeedListPage;
  tab2Root = FeedSettingsPage;
}
