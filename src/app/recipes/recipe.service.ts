import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.module';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simply test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNzr-ncTidM6uNEtOMHZVEGQup4khmCZIMw&usqp=CAU'),
    new Recipe('A Second Recipe', 'Good one recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNzr-ncTidM6uNEtOMHZVEGQup4khmCZIMw&usqp=CAU')  ]

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
