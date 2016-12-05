import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/switchMap';

import orderBy from 'lodash/orderBy';

import { AppState } from '../app/app.state';

import { Feed } from '../models/feed';
import { Item } from '../models/item';
import { Settings } from '../models/settings';

const SETTINGS_STORAGE_KEY = 'feedstar:settings';

/*
  Generated class for the FeedService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class FeedService {
  appState: AppState;
  waitForState: Promise<void>;

  constructor(
    public http: Http,
    public storage: Storage
  ) {
    this.waitForState = this.initialiseState();
  }

  get feedUrl(): string {
    return this.appState.settings.feedUrl;
  }

  set feedUrl(value: string) {
    this.appState.settings.feedUrl = value;
    this.saveSettings(this.appState.settings);
  }

  get feed(): Feed {
    return this.appState.feed;
  }

  set feed(value: Feed) {
    this.appState.feed = value;
  }

  get items(): Item[] {
    return this.appState.items;
  }

  set items(value: Item[]) {
    this.appState.items = value;
  }

  initialiseState(): Promise<void> {
    this.appState = {
      settings: {
        feedUrl: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
      },
      feed: null,
      items: []
    };

    return this.fetchSettings().then(settings => {
      if(settings) {
        this.appState.settings = settings;
      }
    });
  }

  validateFeed(url): Promise<void> {
    return this.http
      .get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`)
      .toPromise()
      .then(response => {
        const res = response.json();
        if(!res || res.status !== 'ok') {
          throw new Error('Invalid Feed');
        }
      });
  }

  getItems(): Observable<{ feed: Feed, items: Item[] }> {
    return Observable.fromPromise(this.waitForState)
      .switchMap(() => this.fetchItemsFromAPI());
  }

  private fetchItemsFromAPI(): Observable<{ feed: Feed, items: Item[] }> {
    return this.http
      .get('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(this.feedUrl))
      .retry(2)
      .map(response => {
        const res = response.json();

        this.feed = res.feed;
        this.items = orderBy(res.items, 'pubDate', ['desc']);

        return {
          feed: this.feed,
          items: this.items,
          url: this.feedUrl
        };
      });
  }

  private fetchSettings(): Promise<Settings> {
    return this.storage
      .get(SETTINGS_STORAGE_KEY)
      .then(settings => {
        if(settings) {
          return JSON.parse(settings);
        }
      });
  }

  private saveSettings(settings: Settings): Promise<Settings> {
    return this.storage
      .set(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
      .then(() => settings);
  }

}
