import { Injectable } from '@angular/core';
import { Recipe } from './recipe.module';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A Great Hamburger',
      'This is a simply Hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/6/62/NCI_Visuals_Food_Hamburger.jpg',
      [new Ingredient('Pão', 3), new Ingredient('Carne', 1)]
    ),
    new Recipe(
      2,
      'Japonese Food',
      'Good one recipe',
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Kaiseki_001.jpg',
      [new Ingredient('Arroz', 3), new Ingredient('Atum', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppinglistService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addIngredientsToSoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    const recipeObj = this.recipes.find((rec) => rec.id === id);
    if (recipeObj) {
      Object.assign(recipeObj, recipe);
    }
    this.recipesChanged.next(this.recipes.slice());
  }

  getIndexValue(): number {
    return Math.max(...this.recipes.map((item) => item.id));
  }

  onDelete(id: number) {
    const newRecipeArray = this.recipes.filter((rec) => rec.id !== id);
    this.recipes = newRecipeArray;
    this.recipesChanged.next(newRecipeArray.slice());
  }

  // onDeleteIngredient(id: number, ingredient: string) {
  //   const recipe = this.getRecipe(id)
  //   const newIngredientsList = recipe.ingredients.filter(f => f.name !== ingredient)
  //   recipe.ingredients = newIngredientsList
  //   this.updateRecipe(id, recipe)
  // }
}
