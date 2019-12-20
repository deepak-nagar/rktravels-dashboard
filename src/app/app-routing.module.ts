import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login";
import { CategoryComponent, CategoryListComponent } from "./category";
import { ServicesComponent } from "./services";
import { AuthGuard } from "./_helpers";
import { PackagesComponent } from "./packages";
const routes: Routes = [
  {
    path: "categories",
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "category",
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "services",
    component: ServicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "packages",
    component: PackagesComponent,
    canActivate: [AuthGuard]
  },

  { path: "", component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
