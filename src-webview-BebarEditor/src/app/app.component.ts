import { Component } from '@angular/core';
import { IBebar } from 'bebar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bebar = {
    data: [
      {file: "*"}
    ]
  };
  title = 'bebar-angular';
}
