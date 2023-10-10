import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';


const routes: Routes = [
  {
    path: "",
    component: ProductCrudComponent
  },
  {
    path: "create",
    component: ProductCreateComponent
  },
  {
    path: "update/:id",
    component: ProductUpdateComponent
  },
  {
    path: "delete/:id",
    component: ProductDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
