import { Injectable, Pipe } from '@angular/core';

import timeago from 'timeago.js';

/*
  Generated class for the Timeago pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'timeago'
})
@Injectable()
export class Timeago {
  transform(value) {
    return new timeago().format(value);
  }
}
