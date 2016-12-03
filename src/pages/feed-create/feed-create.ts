import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the FeedCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed-create',
  templateUrl: 'feed-create.html'
})
export class FeedCreatePage {

  constructor(public viewCtrl: ViewController) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
