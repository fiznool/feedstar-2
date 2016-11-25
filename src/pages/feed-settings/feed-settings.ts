import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  feedSettingsForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public feedService: FeedService
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

}
