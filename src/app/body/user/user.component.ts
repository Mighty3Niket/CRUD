import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { GetUser, GetUsers, User, Users } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [InputTextModule, ToolbarModule, ConfirmDialogModule, DropdownModule, FormsModule, CommonModule, CardModule, TableModule, ButtonModule, RadioButtonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [ MessageService, ConfirmationService]
})
export class UserComponent implements OnInit{
  user: GetUser[] = [];
  act!: string;
  radio: FormGroup | undefined;
  // isAdding: boolean = false;
  isActive: any[] = [
    { name: 'All', value: 'All' },
    { name: 'Active', value: true },
    { name: 'Inactive', value: false },
  ];
  dialogRef: DynamicDialogRef | undefined;
  constructor(private userService: UserService, public dialogService: DialogService, private messageService: MessageService, private confirmationService: ConfirmationService) {}
  ngOnInit() {
    this.userService.GetAllUsers().subscribe((data)=>{
      //console.log(data);
      this.user = data.result.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
    });
    this.radio = new FormGroup({
    selectedActive: new FormControl()
    });
  }
  // handleButtonClick(event: any) {
  //   this.showDialog(event.rowData.ref_no,'Agency Bank Account Details');
  // }
  showDialog(id?: number, headerText?: string) {
    console.log(id);
    // this.isAdding = true;
    this.dialogRef = this.dialogService.open(UserFormComponent, {
      header: headerText || 'Add User',
      data: { id: id },
      draggable: true,
      //maximizable: true,
    });
    this.dialogRef.onClose.subscribe((data) => {
      if (data.added) {
        this.showAdd();}
      this.ngOnInit();
    });
    //this.showAdd();
  }

  showUpdateDialog(id: number, headerText?: string) {
    //this.userService.setId(id);
    console.log(id);
    console.log("test");
    
   // var userId = id;
    this.dialogRef = this.dialogService.open(UserFormComponent, {
      header: headerText || 'Update User',
      data: { id: id },
      draggable: true,
      //maximizable: true,
    });
    //const x = id;
    this.dialogRef.onClose.subscribe((data) => {
      if (data.updated) {
        this.showUpdate();}
      this.ngOnInit();
    });
    //this.showUpdate();
  }

  activeUsers(event: any){
    if (event.value == 'All'){
        this.userService.GetAllUsers().subscribe((data)=>{
          //console.log(data);
          this.user = data.result;
        });
      }
    else{
      this.userService.GetActiveUsers(event.value).subscribe((data)=>{
        //console.log(data);
        this.user = data.result;
      });
      console.log(event);
    }
  }
  DeleteU(id: number){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text cursor-pointer",
      rejectButtonStyleClass:"p-button-text p-button-text cursor-pointer",
      acceptIcon:"none",
      rejectIcon:"none",
  
      accept: () => {
        this.userService.DeleteUsers(id).subscribe((data)=>{
          console.log(data);
          this.user = Array(data.result);
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully!', life: 2000 });
          this.ngOnInit();
        });
      },
      reject: () => {
       // this.messageService.add({ severity: 'error', summary: 'Not Deleted', detail: 'User was not deleted!', life: 2000 });
        this.ngOnInit();
      }
      });
    }
  showAdd(){
    this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User added successfully!', life: 2000 })
  }
  showUpdate(){
    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated successfully!', life: 2000 })
  }
  
}
    // DeleteU(id: number){
    //   console.log(id);
      
    //   this.userService.DeleteUsers(id).subscribe((data)=>{
    //     console.log(data);
    //     this.user = Array(data.result);
    //     //this.showError();
    //     //this.ngOnInit();
    //   });
    // }
    // showError() {
    //   this.confirmationService.confirm({
    //     message: 'Do you want to delete this record?',
    //     header: 'Delete Confirmation',
    //     icon: 'pi pi-info-circle',
    //     acceptButtonStyleClass:"p-button-danger p-button-text",
    //     rejectButtonStyleClass:"p-button-text p-button-text",
    //     acceptIcon:"none",
    //     rejectIcon:"none",

    //     accept: () => {
    //         this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully!', life: 2000 });
    //     },
    //     reject: () => {
    //         this.messageService.add({ severity: 'error', summary: 'Not Deleted', detail: 'User was not deleted!' });
    //       }
    //   });
    // }


    // DeleteUsers(){
    //   if (this.showError.accept)
    // }
      //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully!', life: 2000 });
  //}
  
