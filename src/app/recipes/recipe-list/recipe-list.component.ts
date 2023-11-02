import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipes = recipes)
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNavigateToRecipe(id: number) {
    this.router.navigate(['/recipes', id]);
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
