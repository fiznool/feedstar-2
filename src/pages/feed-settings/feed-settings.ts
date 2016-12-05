import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';

import without from 'lodash/without';

import { Feed } from '../../models/feed';
import { FeedService } from '../../providers/feed-service';
import { FeedCreatePage } from '../feed-create/feed-create';

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
    public feedService: FeedService,
    public modalCtrl: ModalController
  ) {}

  get feeds(): Feed[] {
    return this.feedService.feeds;
  }

  set feeds(feeds: Feed[]) {
    this.feedService.feeds = feeds;
  }

  get feedUrl(): string {
    return this.feedService.feedUrl;
  }

  set feedUrl(url: string) {
    this.feedService.feedUrl = url;
  }

  ionViewDidLoad() {
    this.feedSettingsForm = this.fb.group({
      feedUrl: [ this.feedUrl, Validators.required ]
    });
  }

  ionViewWillLeave() {
    if(this.feedSettingsForm) {
      this.feedUrl = this.feedSettingsForm.value.feedUrl;
    }
  }

  addFeed() {
    const addFeedModal = this.modalCtrl.create(FeedCreatePage);
    addFeedModal.onDidDismiss(feed => {
      if(feed) {
        this.feeds = this.feeds.concat(feed);
      }
    });
    addFeedModal.present();
  }

  removeFeed(feed) {
    this.feeds = without(this.feeds, feed);
  }

}
