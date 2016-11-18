import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FeedService } from '../../providers/feed-service';

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
  feed;
  items = [];

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

}
