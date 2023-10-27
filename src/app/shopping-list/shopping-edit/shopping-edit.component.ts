import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  itemEditSubscription: Subscription
  editMode = false
  editedItemIndex: number
  editedItem: Ingredient
  @ViewChild('f', {static: false}) shoppingListForm: NgForm

  constructor(private shoppingListService: ShoppinglistService) {}

  ngOnInit() {
    this.itemEditSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true
        this.editedItemIndex = index
        this.editedItem = this.shoppingListService.getIngredient(index)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onAddorUpdateNewItem(f: NgForm) {
    const newIngredient = new Ingredient(f.value.name, f.value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false
    f.reset()
  }

  onClear() {
    this.shoppingListForm.reset()
    this.editMode = false
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
    this.itemEditSubscription.unsubscribe()
  }
}
