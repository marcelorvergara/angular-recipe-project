import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.module';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit{

  recipeItem: Recipe

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
      this.recipeService.recipeSelected.subscribe(
        (recipe: Recipe) => {
          this.recipeItem = recipe
        }
      )
  }
}