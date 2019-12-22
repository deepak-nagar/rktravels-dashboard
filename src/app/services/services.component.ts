import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Data } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, DataService } from "../_services";
import { api } from "../../api";
@Component({ templateUrl: "services.component.html" })
export class ServicesComponent implements OnInit {
  serviecForm: FormGroup;
  loading = false;
  submitted = false;
  files: File[] = [];
  uploadedFiles = [];
  category = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private alertService: AlertService
  ) {
    this.fetch();
  }
  ngOnInit() {
    this.serviecForm = this.formBuilder.group({
      service: ["", Validators.required],
      category_id: ["", Validators.required],
      price: ["", Validators.required],

      description: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
  }
  fetch() {
    this.dataService.allCategory().subscribe(value => {
      this.setData(value);
    });
  }
  setData(data) {
    this.category = data.data;
  }
  get f() {
    return this.serviecForm.controls;
  }
  onFilesAdded(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    for (var i = 0; i <= this.files.length - 1; i++) {
      this.readFile(this.files[i]).then(fileContents => {
        const data = {
          file: fileContents
        };

        this.dataService
          .insertImages(data)
          .pipe(first())
          .subscribe(data => {
            this.uploadedFiles.push(data.imageName);
          });
      });
    }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        // console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        // console.error("No file to read.");
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.serviecForm.controls);
    // this.serviecForm.controls["images"].setErrors(null);
    if (this.serviecForm.invalid) {
      return;
    }
    const data = {
      name: this.f.service.value,
      category_id: this.f.category_id.value,
      price: this.f.price.value,
      description: this.f.description.value,
      images: this.uploadedFiles
    };
    this.loading = true;
    this.dataService
      .insertService(data)
      .pipe(first())
      .subscribe(
        data => {
          if (data.error) {
            this.alertService.error(data.error);
            this.loading = false;
          } else {
            this.alertService.success(data.msg);
            this.router.navigate(["/services"]);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
