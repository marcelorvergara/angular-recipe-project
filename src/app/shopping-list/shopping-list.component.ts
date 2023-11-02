import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppinglistService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.idChangeSubscription =
      this.shoppingListService.ingridentsChanged.subscribe(
        (ingredients: Ingredient[]) => (this.ingredients = ingredients)
      );
  }

  addItemToIngridients(ingItem: Ingredient) {
    this.ingredients.push(ingItem);
  }

  ngOnDestroy(): void {
    this.idChangeSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    // Passing the item being edit. Listen to this subject in some other place
    this.shoppingListService.startedEditing.next(index);
  }
}
