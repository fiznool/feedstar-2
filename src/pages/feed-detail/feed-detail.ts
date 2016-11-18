import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
  }

}
