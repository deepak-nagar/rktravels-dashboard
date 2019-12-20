import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, AuthenticationService } from "./_services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "my-dream-app";
  constructor(authService: AuthenticationService, router: Router) {
    if (authService.isLoggedIn()) {
      router.navigate(["categories"]);
    }
  }
}
