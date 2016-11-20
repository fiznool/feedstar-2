import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { Feed } from '../../models/feed';
import { Item } from '../../models/item';
import { FeedService } from '../../providers/feed-service';
import { FeedDetailPage } from '../feed-detail/feed-detail'
import { FeedSettingsPage } from '../feed-settings/feed-settings'

/*
  Generated class for the FeedList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  feed: Feed;
  items: Item[];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public feedService: FeedService
  ) {}

  ionViewDidLoad() {
    this.refreshItems();
  }

  refreshItems() {
    return this.feedService
      .getItems()
      .then(res => {
        this.feed = res.feed;
        this.items = res.items;
      });
  }

  viewItem(item) {
    this.navCtrl.push(FeedDetailPage, { item })
  }

  configureFeed() {
    const settingsModal = this.modalCtrl.create(FeedSettingsPage, {
      feedUrl: this.feedService.feedUrl
    });

    settingsModal.onDidDismiss(data => {
      this.feedService.feedUrl = data.feedUrl;
      this.refreshItems();
    });

    settingsModal.present();
  }

}
