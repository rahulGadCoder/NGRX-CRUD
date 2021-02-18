import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'demos';
  msg = 'I am Parent';
  childMsg: any;

  displayVal(cnt) {
    console.log("childMsg", cnt);
    
  }
}
