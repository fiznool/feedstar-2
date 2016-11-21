import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

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
  feedSettingsForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    const feedUrl = this.navParams.get('feedUrl');
    this.feedSettingsForm = this.fb.group({
      feedUrl: [ feedUrl, Validators.required ]
    });
  }

  dismiss() {
    const feedUrl = this.feedSettingsForm.value.feedUrl;
    this.viewCtrl.dismiss({ feedUrl });
  }

}
