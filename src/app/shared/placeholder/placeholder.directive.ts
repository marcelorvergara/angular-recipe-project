import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-placeolder]',
})
export class PlaceHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
