import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the FeedService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const FEED_URL = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk';

@Injectable()
export class FeedService {

  constructor(public http: Http) {}

  getItems(): Promise<any> {
    return this.http
      .get('http://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(FEED_URL))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

}
