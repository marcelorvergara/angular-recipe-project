import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  recipes: Recipe[]

  constructor(private recipeService: RecipeService, private router: Router){}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }

  onNavigateToRecipe(id: number) {
    this.router.navigate(['/recipes', id])
  }
}
