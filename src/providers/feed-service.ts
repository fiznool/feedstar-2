import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Feed } from '../models/feed';
import { Item } from '../models/item';

/*
  Generated class for the FeedService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class FeedService {
  _feedUrl = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';

  constructor(public http: Http) {}

  get feedUrl() {
    return this._feedUrl;
  }

  set feedUrl(value: string) {
    this._feedUrl = value;
  }

  getItems(): Promise<{ feed: Feed, items: Item[] }> {
    return this.http
      .get('http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(this.feedUrl))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}
