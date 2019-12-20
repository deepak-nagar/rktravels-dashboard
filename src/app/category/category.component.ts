import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, DataService } from "../_services";

@Component({ templateUrl: "category.component.html" })
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private alertService: AlertService
  ) {}
  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      category: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
  }
  get f() {
    return this.categoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return;
    }

    this.loading = true;
    this.dataService
      .insertCategory(this.f.category.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            this.alertService.error(data.error);
            this.loading = false;
          } else {
            this.alertService.success(data.msg);
            this.loading = false;
            this.router.navigate(["/categories"]);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
