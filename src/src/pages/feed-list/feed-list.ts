import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import {FeedService, FeedItem, Feed} from '../../providers/feed-service';

@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;

  constructor(private nav: NavController, private feedService: FeedService, private navParams: NavParams) {
    this.selectedFeed = navParams.get('selectedFeed');
    this.selectedFeed = {
      title: 'keensoft News',
      url: 'http://www.keensoft.es/category/noticias/feed/'
    }
  }

  public openArticle(url: string) {
    window.open(url, '_blank');
  }

  loadArticles() {

    this.loading = true;
    this.feedService.getArticlesForUrl(this.selectedFeed).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }

  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedService.getSavedFeeds().then(
        feeds => {
          if (feeds.length > 0) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }
}
