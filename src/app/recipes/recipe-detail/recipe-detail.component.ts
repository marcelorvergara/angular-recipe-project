import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeSelectedItem: Recipe

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.recipeSelectedItem = this.recipeService.getRecipe(Number(params['id']))
        }
      )
      // this.recipeSelectedItem = this.recipeService.getRecipe(Number(this.route.snapshot.params['id']))
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToSoppingList(this.recipeSelectedItem.ingredients)
  }
}
