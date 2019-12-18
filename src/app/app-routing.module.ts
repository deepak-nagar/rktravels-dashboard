import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login";
import { DashboardComponent } from "./dashboard";
import { ServicesComponent } from "./services";
import { AuthGuard } from "./_helpers";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "services",
    component: ServicesComponent,
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
