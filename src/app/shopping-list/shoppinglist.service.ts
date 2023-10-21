import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ]

  ingridentsChanged = new EventEmitter<Ingredient[]>()

  getIngredients() {
    return this.ingredients.slice();
  }
  constructor() { }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingridentsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }
    this.ingredients.push(...ingredients)
    this.ingridentsChanged.emit(this.ingredients.slice())
  }
}
