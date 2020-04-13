import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Article } from './../../interfaces/article';
import { StoriesService } from './../../services/stories/stories.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  articles: Observable<Article[]>;
  category = 'fitness';

  constructor(
    private storiesService: StoriesService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.articles = this.storiesService.getStories(this.category).pipe(
      map((stories: Article[]) => {
        return stories.map((story: Article) => {
          return {
            ...story,
            description: this.truncateString(story.description, 25),
          };
        });
      })
    );
  }

  truncateString(str: string, max: number) {
    // Truncate sentence to a certain number of words
    // Reference: Rafi - https://stackoverflow.com/a/56460731
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';

    return array.slice(0, max).join(' ') + ellipsis;
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

  view(url: string) {
    window.open(url, '_system');
  }
}
