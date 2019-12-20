import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { api } from "../../api";
import { User } from "../_models";

@Injectable({ providedIn: "root" })
export class DataService {
  constructor(private http: HttpClient) {}

  insertCategory(category: string) {
    return this.http
      .post<any>(`http://localhost:8000/api/category`, { category })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
          }

          return user;
        })
      );
  }
  allCategory() {
    return this.http.get(`${api.api_url}/category/`).pipe(
      map(res => {
        return res;
      })
    );
  }
  deleteCategory(id) {
    const data = {
      _method: "DELETE"
    };
    return this.http.post(`${api.api_url}/category/` + id, data).pipe(
      map(res => {
        return res;
      })
    );
  }
}
