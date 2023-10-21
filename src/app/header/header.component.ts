import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() selectedMenu = new EventEmitter<string>();

  navigate(menuItem: string) {
    this.selectedMenu.emit(menuItem)
  }
}
