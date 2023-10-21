import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a simply test', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNzr-ncTidM6uNEtOMHZVEGQup4khmCZIMw&usqp=CAU'),
    new Recipe('A Second Recipe', 'Good one recipe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNzr-ncTidM6uNEtOMHZVEGQup4khmCZIMw&usqp=CAU')  ]

  @Output() selectedRecipe = new EventEmitter<Recipe>()
    
    onRecipeSelected(recipe: Recipe) {
      this.selectedRecipe.emit(recipe)
    }  
}
