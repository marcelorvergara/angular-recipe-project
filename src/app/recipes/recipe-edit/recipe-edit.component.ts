import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number
  editMode = false
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService){}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id'])
        // Check if it is in edit mode or in new mode
        this.editMode = params['id'] != null
        this.initForm()
      }
    )
  }

  private initForm() {
    let recipeName = ''
    let recipeImgPath = ''
    let recipeDesc = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImgPath = recipe.imagePath
      recipeDesc = recipe.description
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDesc),
      'ingredients': recipeIngredients
    })
  }

  onSubmit() {
    console.log('test')
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }
}
