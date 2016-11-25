import { Component } from '@angular/core';
import { LoadingController, ModalController, NavController } from 'ionic-angular';

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
  currentFeedUrl: String;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public feedService: FeedService
  ) {}

  ionViewWillEnter() {
    if(this.feedService.feedUrl !== this.currentFeedUrl) {
      this.refreshItems();
    }
  }

  refreshItems() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    const onNext = res => {
      this.feed = res.feed;
      this.items = res.items;
      this.currentFeedUrl = res.url;
    };

    const onError = err => {
      console.log('Error fetching stream:', err);
    };

    const onComplete = () => {
      loading.dismiss();
    };

    return this.feedService
      .getItems()
      .subscribe(onNext, onError, onComplete);
  }

  viewItem(item) {
    this.navCtrl.push(FeedDetailPage, { item })
  }

}
