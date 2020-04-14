import { PopoverComponent } from './../../components/popover/popover.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Article } from './../../interfaces/article';
import {
  StoriesService,
  StorySort,
  StoryCategory,
} from './../../services/stories/stories.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  articles: Observable<Article[]>;
  category: StoryCategory = 'fitness';
  sortBy: StorySort = 'publishedAt';

  constructor(
    private storiesService: StoriesService,
    private actionSheetCtrl: ActionSheetController,
    private iab: InAppBrowser,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.getStories();
  }

  getStories(): Observable<Article[]> {
    return (this.articles = this.storiesService
      .getStories({ category: this.category, sortBy: this.sortBy })
      .pipe(
        map((stories: Article[]) => {
          return stories.map((story: Article) => {
            return {
              ...story,
              description: this.truncateString(story.description, 25),
            };
          });
        })
      ));
  }

  truncateString(str: string, max: number) {
    // Truncate sentence to a certain number of words
    // Reference: Rafi - https://stackoverflow.com/a/56460731
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
  }

  doRefresh(ev: any) {
    this.getStories()
      .toPromise()
      .then(() => {
        if (this.articles) {
          ev.target.complete();
        }
      });
  }

  showSortPopover(event: any) {
    this.popoverCtrl
      .create({
        component: PopoverComponent,
        event,
        translucent: true,
        componentProps: {
          title: 'Sort By',
          items: ['Popularity', 'Publication Date'],
        },
      })
      .then((popover) => {
        popover.present();
        return popover.onWillDismiss();
      })
      .then((result) => {
        if (result.data) {
          switch (result.data) {
            case 'Popularity':
              this.sortBy = 'popularity';
              break;
            case 'Publication Date':
              this.sortBy = 'publishedAt';
              break;
            default:
              break;
          }

          this.getStories();
        }
      });
  }

  async showCategoryActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Categories',
      buttons: [
        {
          text: 'Fitness',
          icon: 'fitness-outline',
          handler: () => {
            this.category = 'fitness';
            this.getStories();
          },
        },
        {
          text: 'Diet',
          icon: 'fast-food-outline',
          handler: () => {
            this.category = 'diet';
            this.getStories();
          },
        },
        {
          text: 'Exercise',
          icon: 'bicycle-outline',
          handler: () => {
            this.category = 'exercise';
            this.getStories();
          },
        },
        {
          text: 'Health',
          icon: 'heart-outline',
          handler: () => {
            this.category = 'health';
            this.getStories();
          },
        },
        {
          text: 'Lifestyle',
          icon: 'body-outline',
          handler: () => {
            this.category = 'lifestyle';
            this.getStories();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  openLink(url: string) {
    this.iab.create(url);
  }
}
