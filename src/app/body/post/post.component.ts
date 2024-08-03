import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { PostFormComponent } from './post-form/post-form.component';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PaginatorModule, InputTextModule, ToastModule, ToolbarModule, ConfirmDialogModule, ReactiveFormsModule, CommonModule, TableModule, CardModule, ButtonModule, DropdownModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [DialogService, ConfirmationService, MessageService]
})
export class PostComponent {
  post: any;
  isPublished: any[] = [
    { name: 'All', value: 'All' },
    { name: 'Published', value: true },
    { name: 'Not Published', value: false },
  ];
  category:any[]= [
    { name: 'All',value: 'All' },
    { name: 'Health (1)',value: 1 },
    { name: 'Technology (2)',value: 2 },
    { name: 'Travel (3)',value: 3 },
    { name: 'Sports (4)',value: 4 },
    { name: 'Culture (5)',value: 5 },
  ];
  //showIcon: boolean;
  //iconClass = 'pi-check';
  first: number = 0;

  rows: number = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
  //rows: number = 5;
  dialogRef: DynamicDialogRef | undefined;
  constructor(private postService: PostService, public dialogService: DialogService, private confirmationService: ConfirmationService, private messageService: MessageService) {}
  ngOnInit() {
    this.postService.GetAllPosts().subscribe((data)=>{
      //console.log(data);
      this.post = data.result.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
    });
    //this.paginate({ first: 0, rows: this.rows });
    //this.radio = new FormGroup({
    //selectedActive: new FormControl()
    //});
  }
  
  // handleButtonClick(event: any) {
  //   this.showDialog(event.rowData.ref_no,'Agency Bank Account Details');
  // }
  // paginate(event: any) {
  //   const start = event.first;
  //   const end = start + event.rows;
  //   this.paginatedPosts = this.post.slice(start, end);
  // }
  showDialog(id?: number, headerText?: string) {
    console.log(id);
    this.dialogRef = this.dialogService.open(PostFormComponent, {
      header: headerText || 'Add Post',
      data: { id: id },
      draggable: true,
      //maximizable: true,
    });
    this.dialogRef.onClose.subscribe((data) => {
      if (data.added) {
        this.showAdd();}
      this.ngOnInit();
    });
  }
  showUpdateDialog(id: number, headerText?: string) {
    console.log(id);
    this.postService.setId(id);
    this.dialogRef = this.dialogService.open(PostFormComponent, {
      header: headerText || 'Update Post',
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
  }

  publishedPosts(event: any){
    if (event.value == 'All'){
      this.postService.GetAllPosts().subscribe((data)=>{
        //console.log(data);
        this.post = data.result;
      });
    }
    else{
      this.postService.GetPublishedPosts(event.value).subscribe((data)=>{
      //console.log(data);
      this.post = data.result;
      });
      console.log(event);
    }
  }

  categoryPosts(event: any){
    if (event.value == 'All'){
      this.postService.GetAllPosts().subscribe((data)=>{
        //console.log(data);
        this.post = data.result;
      });
    }
    else{
      this.postService.GetPostByCategory(event.value).subscribe((data)=>{
      //console.log(data);
      this.post = data.result;
      });
      console.log(event);
    }
  }
  DeleteP(id: number){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text cursor-pointer",
      rejectButtonStyleClass:"p-button-text p-button-text cursor-pointer",
      acceptIcon:"none",
      rejectIcon:"none",
  
      accept: () => {
        this.postService.DeletePosts(id).subscribe((data)=>{
          console.log(data);
          this.post = Array(data.result);
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully!', life: 2000 });
          this.ngOnInit();
        });
      },
      reject: () => {
        //this.messageService.add({ severity: 'error', summary: 'Not Deleted', detail: 'User was not deleted!', life: 2000 });
        this.ngOnInit();
      }
    });
  }
  showAdd(){
    this.messageService.add({ severity: 'success', summary: 'Added', detail: 'User added successfully!', life: 2000 });
  }
  showUpdate(){
    this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated successfully!', life: 2000 });
  }
  // get showIcon(): boolean {
  //   return this.post && this.post.isPublished;
  // }
  
      // DeleteP(id: number){
      //   console.log(id);
        
      //   this.postService.DeletePosts(id).subscribe((data)=>{
      //     console.log(data);
      //     this.post = Array(data.result);
      //     this.ngOnInit();
      //   });
      // }
}
