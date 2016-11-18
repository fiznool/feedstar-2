import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Feed } from '../../models/feed';
import { Item } from '../../models/item';
import { FeedService } from '../../providers/feed-service';
import { FeedDetailPage } from '../feed-detail/feed-detail'

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
    public feedService: FeedService
  ) {}

  ionViewDidLoad() {
    this.feedService
      .getItems()
      .then(res => {
        this.feed = res.feed;
        this.items = res.items;
      });
  }

  viewItem(item) {
    this.navCtrl.push(FeedDetailPage, { item })
  }

}
