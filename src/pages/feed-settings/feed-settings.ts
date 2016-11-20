import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { FeedService } from '../../providers/feed-service';

/*
  Generated class for the FeedSettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed-settings',
  templateUrl: 'feed-settings.html'
})
export class FeedSettingsPage {
  feedUrl: string;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.feedUrl = this.navParams.get('feedUrl');
  }

  dismiss() {
    this.viewCtrl.dismiss({ feedUrl: this.feedUrl });
  }

}
