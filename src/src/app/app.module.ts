import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { FeedListPage } from '../pages/feed-list/feed-list';
import { FeedBlogListPage } from '../pages/feed-list/feed-blog';
import { FeedService } from '../providers/feed-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    FeedListPage,
    FeedBlogListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    FeedListPage,
    FeedBlogListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},FeedService, Storage]
})
export class AppModule {}
