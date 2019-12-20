import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";

import { AppRoutingModule } from "./app-routing.module";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AppComponent } from "./app.component";
import { CategoryComponent, CategoryListComponent } from "./category";
import { LoginComponent } from "./login";
import { ServicesComponent } from "./services";
import { PackagesComponent } from "./packages";
import { AlertComponent } from "./_components";
import { DataTableModule } from "ng-angular8-datatable";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTableModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    CategoryListComponent,
    CategoryComponent,

    ServicesComponent,
    PackagesComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
