import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImgPath = recipe.imagePath
      recipeDesc = recipe.description
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDesc)
    })
  }

  onSubmit() {
    console.log('test')
  }
}
