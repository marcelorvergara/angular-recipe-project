import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.module';
import { DataStorageService } from '../shared/data-storage.service';

export const RecipesResolverService: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // return this.dataStorageService.fetchRecipes();
  return inject(DataStorageService).fetchRecipes();
};
