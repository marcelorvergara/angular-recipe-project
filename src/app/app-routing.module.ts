import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailHolderComponent } from './recipes/recipe-detail-holder/recipe-detail-holder.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { recipes: RecipesResolverService },
    children: [
      { path: '', component: RecipeDetailHolderComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipes: RecipesResolverService },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { recipes: RecipesResolverService },
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
