import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, DataService } from "../_services";

@Component({ templateUrl: "categoryList.component.html" })
export class CategoryListComponent {
  data = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private alertService: AlertService
  ) {
    this.fetch();
  }
  fetch() {
    this.dataService.allCategory().subscribe(value => {
      this.setData(value);
    });
  }
  setData(data) {
    this.data = data.data;
  }
  deleteCategory(id: number, index: number) {
    if (confirm("Are you sure to delete ")) {
      this.dataService.deleteCategory(id).subscribe(response => {
        this.alertService.success("Deleted Successfully");
        this.setData(response);
      });
    }
  }
}
