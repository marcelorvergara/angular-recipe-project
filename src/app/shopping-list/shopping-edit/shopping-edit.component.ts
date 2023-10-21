import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  
  @ViewChild('nameInput', {static: true}) nameInputRef : ElementRef
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef

  @Output() addNewItem = new EventEmitter<Ingredient>()

  onAddNewItem(){
    this.addNewItem.emit(new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value))
  }

}
