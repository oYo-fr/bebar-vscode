import { Component } from '@angular/core';
import { IBebar, IDataset, IHelperset, IPartialset } from 'bebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bebar: IBebar = {
    data: "./data*.json",
    helpers: [
      {file: "./helpers/*.js"}
    ],
    partials: [
      {file: "./partials/*.js"}
    ],
    templates: [

    ]
  };
  title = 'bebar-angular';
  accordionItems = {
    data: {
      expanded: true
    },
    templates: {
      expanded: true
    },
    partials: {
      expanded: true
    },
    helpers: {
      expanded: true
    }
  };
}
