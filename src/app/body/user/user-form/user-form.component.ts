import { HttpClient } from '@angular/common/http';
import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { GetUser, User } from '../../../models/user.model';
import { InputTextModule } from 'primeng/inputtext';
import { Password, PasswordModule } from 'primeng/password';
import { UserComponent } from '../user.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ConfirmDialogModule, CommonModule, ReactiveFormsModule, DropdownModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class UserFormComponent implements OnInit{
  visible = true;
  id!: number;
  theUser?: GetUser;
  selectedRow: GetUser[] | null = null;
  isAdding: boolean = false;

  //@Output() onCloseModel = new EventEmitter();
  active:any[]= [
    { name: 'True',value:true },
    { name: 'False',value:false },
  ];
  user: FormGroup = new FormGroup({});

  constructor(private userService: UserService, public mainRef: DynamicDialogRef, private config: DynamicDialogConfig, private fb:FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService){
    
  }
  ngOnInit() {
    this.user= this.userForm();
    this.id = this.config.data.id;
    console.log(this.id);
    this.isAdding=true;
    console.log(this.isAdding);
    if (this.id != null) {
      this.userService .GetUserById(this.id).subscribe((response) => {
        if (response.statusCode == 200) {
          this.theUser = response.result[0];
          console.log(response);
          console.log(this.theUser);
          this.user = this.userForm(true);
          this.isAdding=false;
          console.log(this.isAdding);
        }
      });  
    }
  }

  userForm(isDisabled: boolean = false): FormGroup {
    const new_form= this.fb.group({
      id: [{value:this.theUser?.id??null,disabled:false}, Validators.required],
      Name: [{value:this.theUser?.name??"",disabled:isDisabled}, Validators.required],
      Password: [{value:this.theUser?.password??"",disabled:isDisabled}, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],
      isActive: [{value:this.theUser?.isActive??"",disabled:false}, Validators.required],
      
    })
    return new_form
  }

  // onSubmit() {
  //   console.log(this.user.value);
  //   //this.isAdding = false;
  //   this.userService.AddUsers(this.user.value).subscribe((response) => {
  //     console.log(response);
  //   }, (error) => {
  //     console.error(error);
  //   });
  //   //console.log(this.user.value);
  //   // this.showAdd();
  //   this.getAll();
  //   this.mainRef.close({added: true});
  // }

  onSubmit() {    
    
    console.log(this.user);
    if(this.user.get("Password")?.valid && this.user.get("Name")?.valid){
      console.log(this.user.value);      
   
      this.userService.AddUsers(this.user.value).subscribe(
        (response)=>{
        console.log(response);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Added successfully'});
        this.getAll();
        this.mainRef.close();
        
        
      })
      
    }else{
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to add user'});
    }
  }

  onUpdate() {
    console.log(this.user.value.id);
    //this.user = this.userService.GetUserById(this.id);
    //console.log(this.config.data);
    const formData = { ...this.user.getRawValue() };
    this.userService.UpdateUsers(formData).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });
    // this.showUpdate();
    this.getAll();
    this.mainRef.close({updated: true});
  }

  onReset(){
    console.log(this.user.value);
    this.user.reset();
    //this.mainRef.close();
  }
  getAll(){
    this.userService.GetAllUsers().subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }
  // showAdd(){
  //   this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User added successfully!', life: 10000 });
  // }
  // showUpdate(){
  //   this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated successfully!', life: 10000 });
  // }
}
