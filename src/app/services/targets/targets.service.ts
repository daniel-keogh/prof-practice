import { Target } from './../../interfaces/target';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const TARGET_KEY = 'target';

@Injectable({
  providedIn: 'root',
})
export class TargetsService {
  constructor(private storage: Storage) {}

  setTarget(target: Target) {
    this.getTarget().then((data) => {
      this.storage.set(TARGET_KEY, {
        ...data,
        ...target,
      });
    });
  }

  getTarget(): Promise<Target> {
    return this.storage.get(TARGET_KEY);
  }
}
