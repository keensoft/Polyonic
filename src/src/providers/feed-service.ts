import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

export class FeedItem {
  description: string;
  link: string;
  title: string;
  content:string;

  constructor(description: string, link: string, title: string, content: string) {
    this.description = description;
    this.link = link;
    this.title = title;
    this.content = content;
  }
}

export class Feed {
  title: string;
  url: string;

  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class FeedService {

  constructor(private http: Http, public storage: Storage) {}

  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return [];
      }
    });
  }

  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(arrayOfFeeds => {
      arrayOfFeeds.push(newFeed)
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }

  public getArticlesForUrl(feedUrl: any) {
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feedUrl.url)+'%22&format=json';
    let articles = [];
    return this.http.get(url)
      .map(data => data.json()['query']['results'])
      .map((res) => {
        if (res == null) {
          return articles;
        }
        let objects = res['item'];

        for (let i = 0; i < objects.length; i++) {
          let item = objects[i];
          var content = item.encoded;
          var imageURL = content.match(/<img[^>]+src="([^">]+)"/);
          let newFeedItem = new FeedItem(item.description, item.link, item.title, !imageURL ? "assets/icon.png" : imageURL[1]);
          articles.push(newFeedItem);
        }
        return articles
      })
  }
}
