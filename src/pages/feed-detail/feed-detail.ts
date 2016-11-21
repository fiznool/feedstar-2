import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import { Item } from '../../models/item';
/*
  Generated class for the FeedDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed-detail',
  templateUrl: 'feed-detail.html'
})
export class FeedDetailPage {

  item: Item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {}

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
  }

  openLink(link: string) {
    this.platform.ready().then(() => {
      new InAppBrowser(link, '_blank');
    });
  }

  handleContentClick(evt) {
    const target = evt.target;
    if(target.tagName === 'A') {
      // Intercept the link and open with the
      // In-App Browser.
      evt.preventDefault();
      this.openLink(target.href);
    }
  }

}
