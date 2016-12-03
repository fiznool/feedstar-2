import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  feedCreateForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    this.feedCreateForm = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      url: [
        '' ,
        FeedCreatePage.isUrl
      ]
    });
  }

  static isUrl(c: FormControl) {
    if(c.value.match(/^(?:http|https):\/\/.+/)) {
      return null;
    }

    return {
      url: true
    }
  }

  saveFeed() {
    this.viewCtrl.dismiss(this.feedCreateForm.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
