import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.module';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  
  @Input('recipeItem') recipe: Recipe

  @Output() recipeSelected = new EventEmitter<void>()


  onRecipeSelec() {
    this.recipeSelected.emit()
  }
}
