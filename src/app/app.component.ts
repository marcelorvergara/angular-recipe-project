import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Vergara';

  menuItem: string = 'recipes'

  onMenuSelected(item: string){
    this.menuItem = item
  }
}
