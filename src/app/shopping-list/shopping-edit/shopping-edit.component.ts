import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  constructor(private shoppingListService: ShoppinglistService) {}

  onAddNewItem(f: NgForm) {
    this.shoppingListService.addIngredient(new Ingredient(f.value.name, f.value.amount))
  }
}
