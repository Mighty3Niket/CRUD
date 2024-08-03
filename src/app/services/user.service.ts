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
export class UserService {

  private id!: number;

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
    url = environment.BaseURL+"User/";
    //url2 = environment.BaseURL+"UserData/"+environment.v2+"/";
    constructor(private http:HttpClient) {}
  
    GetAllUsers(): Observable<any> {
      return this.http.get<any>(this.url + "AllUsers");
    }

    GetUserById(id: number): Observable<any> {
      return this.http.get<any>(this.url + "UserById/" + id);
    }

    GetActiveUsers(x: Boolean): Observable<any> {
      return this.http.get<any>(this.url + "AllActiveUsers/"+ x);
    }
  
    AddUsers(formdata: FormGroup): Observable<any> {
      return this.http.post<any>(this.url + "AddUser/", formdata);
    }
    UpdateUsers(formdata: FormData): Observable<any> {
      return this.http.put<any>(this.url + "UpdateUser/", formdata);
    }
    DeleteUsers(id: number): Observable<any> {
      return this.http.delete<any>(this.url + "DeleteUser/"+ id);
    }
}
