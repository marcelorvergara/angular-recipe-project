import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number
  editMode = false
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router){}

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id'])
        // Check if it is in edit mode or in new mode
        this.editMode = params['id'] !== undefined
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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeService.getIndexValue() + 1,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )

    if (this.editMode) {
      newRecipe.id = this.id
      this.recipeService.updateRecipe(this.id, newRecipe )
    } else {
      this.recipeService.addRecipe(newRecipe)
    }

    this.onCancel()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onRemoveIngredient(index: number) {
    // Remove the control
    // (<FormArray>this.recipeForm.get('ingredients')).controls.splice(index, 1)
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
    // Delete from the ingredients repository
    // this.recipeService.onDeleteIngredient(this.id, (<FormArray>this.recipeForm.get('ingredients')).value[index] )
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route})
  }
}
