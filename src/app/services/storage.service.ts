import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DATABASE_NAME } from '../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

 private uStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.uStorage = storage;
    const characters =  await this.storage.get(DATABASE_NAME);
    if (null === characters){
     await this.uStorage.set(DATABASE_NAME, JSON.stringify([]));
    }
  }

  public async set(key: string, value: any) {
    await this.uStorage?.set(key, value);
  }

  public async get(key: string){
    return await this.storage.get(key);
  }
}
