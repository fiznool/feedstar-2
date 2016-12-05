import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';

import { FeedService } from '../../providers/feed-service';

interface ValidationResult {
 [key:string]:boolean;
}

function debounce(work, timeout: number) {
  let timer = null;
  return function(...args): Promise<void> {
    clearTimeout(timer);
    return new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        work(...args).then(resolve).catch(reject);
      }, timeout);
    });
  };
}

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
    public viewCtrl: ViewController,
    public feedService: FeedService
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
        this.isUrl,
        debounce(this.isValidFeed.bind(this), 200)
      ]
    });
  }

  titleValidationErrors() {
    const errors = [];
    const titleControl = this.feedCreateForm.get('title');
    if(titleControl.touched) {
      if(titleControl.hasError('required')) {
        errors.push('Title is required.');
      }
      if(titleControl.hasError('minlength')) {
        errors.push('Title must be at least 3 characters.');
      }
      if(titleControl.hasError('maxlength')) {
        errors.push('Title must be no more than 30 characters.');
      }
    }
    return errors;
  }

  urlValidationErrors() {
    const errors = [];
    const urlControl = this.feedCreateForm.get('url');
    if(urlControl.touched && urlControl.hasError('url')) {
      errors.push('URL must begin with http:// or https://');
    }
    if(!urlControl.pending && urlControl.hasError('feed')) {
      errors.push('URL is not a valid feed, please check and try again.')
    }
    return errors;
  }

  saveFeed() {
    this.viewCtrl.dismiss(this.feedCreateForm.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private isUrl(c: FormControl): ValidationResult {
    if(c.value.match(/^(?:http|https):\/\/.+/)) {
      return null;
    }

    return {
      url: true
    }
  }

  private isValidFeed(c: FormControl): Promise<ValidationResult> {
    return this.feedService
      .validateFeed(c.value)
      .then(() => null)
      .catch(err => ({ feed: true }));
  }

}
