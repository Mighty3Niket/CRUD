import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GetUser, User, Users } from '../../models/user.model';
import { UserComponent } from '../user/user.component';
//import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent //implements OnInit{
{   // users: GetUser[] = []
    // constructor(public userService : UserService, private router: Router){
    // ngOnInit(){
    //   this.GetAllUsers();
    // }
    // GetAllUsers(){
    //   this.userService.GetAllUsers().subscribe((response) => {
    //     if (response.statusCode == 302) {
    //       this.users = response.result;
    //     }
    //   })
    //   // show(eventName: string) { 
    //   //   this.messageService.add({ 
    //   //       severity: "success", 
    //   //       summary: eventName + " is performed", 
    //   //   }); 
    // } 
    // }
    
}
