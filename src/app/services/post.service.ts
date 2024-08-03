import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AddUsers, GetUser, GetUsers, User, Users } from '../models/user.model';
import { FormGroup } from '@angular/forms';
import { UserComponent } from '../body/user/user.component';


@Injectable({
    providedIn: 'root'
})
export class PostService {

  private id!: number;

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
    url = environment.BaseURL+"Post/";
    //url2 = environment.BaseURL+"UserData/"+environment.v2+"/";
    constructor(private http:HttpClient) {}
  
    GetAllPosts(): Observable<any> {
      return this.http.get<any>(this.url + "GetPost/");
    }

    // GetPost(): Observable<any> {
    //   return this.http.get<any>(this.url + "GetPost");
    // }

    GetPostById(id: number): Observable<any> {
      return this.http.get<any>(this.url + "PostById/" + id);
    }

    GetPublishedPostByCategory(category: number): Observable<any> {
      return this.http.get<any>(this.url + "PublishedPostsByCategory/" + category);
    }

    GetPostByCategory(category: number): Observable<any> {
      return this.http.get<any>(this.url + "PostByCategory/" + category);
    }

    GetPublishedPosts(x: Boolean): Observable<any> {
      return this.http.get<any>(this.url + "AllPublishedPosts/"+ x);
    }
  
    AddPosts(formdata: FormGroup): Observable<any> {
      return this.http.post<any>(this.url + "AddPost/", formdata);
    }
    UpdatePosts(formdata: FormData): Observable<any> {
      return this.http.put<any>(this.url + "UpdatePost/", formdata);
    }
    DeletePosts(id: number): Observable<any> {
      return this.http.delete(this.url + "DeletePost/"+id);
    }
}
