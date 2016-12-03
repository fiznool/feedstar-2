import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';

import pull from 'lodash/pull';

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
  feeds = [{
    title: 'BBC News',
    url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
  }, {
    title: 'Guardian World News',
    url: 'https://www.theguardian.com/world/rss'
  }, {
    title: 'BBC Sport',
    url: 'http://feeds.bbci.co.uk/sport/rss.xml'
  }, {
    title: 'Hacker News',
    url: 'https://news.ycombinator.com/rss'
  }, {
    title: 'JSFeeds',
    url: 'http://jsfeeds.com/feed'
  }, {
    title: 'Lifehacker',
    url: 'http://feeds.gawker.com/lifehacker/full'
  }];

  constructor(
    public fb: FormBuilder,
    public feedService: FeedService,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    const feedUrl = this.feedService.feedUrl;
    this.feedSettingsForm = this.fb.group({
      feedUrl: [ feedUrl, Validators.required ]
    });
  }

  ionViewWillLeave() {
    if(this.feedSettingsForm) {
      this.feedService.feedUrl = this.feedSettingsForm.value.feedUrl;
    }
  }

  addFeed() {
    this.modalCtrl
      .create(FeedCreatePage)
      .present();
  }

  removeFeed(feed) {
    pull(this.feeds, feed);
  }

}
