import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello FeedListPage Page');
  }

}
