import { Component, OnInit } from '@angular/core';
import pkg from '../../../../package.json';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  public version = '';

  ngOnInit(): void {
    this.version = pkg.version;
  }
}
