import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.module';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://fqm-dsv-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe((resp) => console.log(resp));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>('https://fqm-dsv-default-rtdb.firebaseio.com/recipes.json')
      .subscribe((recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
