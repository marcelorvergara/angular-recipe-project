import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.module';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Great Hamburger',
      'This is a simply Hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/6/62/NCI_Visuals_Food_Hamburger.jpg',
      [
        new Ingredient('Pão',3),
        new Ingredient('Carne',1)
      ]),
    new Recipe('Japonese Food',
      'Good one recipe',
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Kaiseki_001.jpg',
      [
        new Ingredient('Arroz', 3),
        new Ingredient('Atum', 5)
      ])
    ]

  constructor(private shoppingListService: ShoppinglistService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToSoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
