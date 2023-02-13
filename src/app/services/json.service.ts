import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GiftData } from '../model/giftData';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http: HttpClient) { }

  public getGiftsDataFromJson(jsonFile: string) {
    return this.http.get(jsonFile).pipe(
      map(data => {
        return data as GiftData;
      })
    );
  }
}
