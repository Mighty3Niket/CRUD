import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PostService } from '../../../services/post.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule, DatePipe } from '@angular/common';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, InputTextModule, PasswordModule, InputTextareaModule, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [DatePipe]
})

export class PostFormComponent implements OnInit{
  visible = true;
  id!: number;
  thePost?: Post;
  isAdding: boolean = false;
  selectedRow: Post[] | null = null;
  //@Input() id!: number;
  //@Output() onCloseModel = new EventEmitter();
  published:any[]= [
    { name: 'True',value:true },
    { name: 'False',value:false },
  ];
  category:any[]= [
    { name: 'Health',value: 1 },
    { name: 'Technology',value: 2 },
    { name: 'Travel',value: 3 },
    { name: 'Sports',value: 4 },
    { name: 'Culture',value: 5 },
  ];
  currentTime: string;
  post: FormGroup = new FormGroup({});
  constructor(private postService: PostService,public mainRef: DynamicDialogRef,  private config: DynamicDialogConfig, private fb:FormBuilder, private http: HttpClient, private datePipe: DatePipe){
    const offset = new Date().getTimezoneOffset() * 60 * 1000; // get the timezone offset in milliseconds
    const istTime = new Date(new Date().getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000)); // add the IST offset
    this.currentTime = istTime.toISOString().slice(0, -1);
  }
  ngOnInit(): void {
  this.post= this.postForm();
  this.id = this.config.data.id;
  console.log(this.id);
  this.isAdding=true;
  console.log(this.isAdding);
  if (this.id != null) {
    this.postService .GetPostById(this.id).subscribe((response) => {
      if (response.statusCode == 200) {
        this.thePost = response.result[0];
        console.log(response);
        console.log(this.thePost);
        this.post = this.postForm(true);
        this.isAdding=false;
        console.log(this.isAdding);
      }
    });  
  }
  }
  postForm(isDisabled: boolean = false): FormGroup {
    const new_form= this.fb.group({
      id: [{value:this.thePost?.id??null,disabled:false}, Validators.required],
      Title: [{value:this.thePost?.title??'',disabled:false}, Validators.required],
      Description: [{value:this.thePost?.description??'',disabled:false}, Validators.required],
      Category: [{value:this.thePost?.category??'',disabled:false}, Validators.required],
      CreatedBy: [{value:this.thePost?.createdBy??'',disabled:isDisabled}, Validators.required],
      CreatedDate: [this.currentTime, Validators.required],
      isPublished: [{value:this.thePost?.isPublished??'',disabled:false}, Validators.required],
      
    })
    return new_form
  }


  onSubmit() {
    // this.isSubmitting = true;
    // this.isUpdating = false;
    console.log(this.post.value);
    this.postService.AddPosts(this.post.value).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });
    console.log(this.post.value);
    // setTimeout(() => {
    //   this.isSubmitting = false;
    // }, 3000);
    this.getAll();
    this.mainRef.close({added: true});
    //this.isSubmitting = false;
  }
  onUpdate() {
  //   console.log(this.post.value);
  // //this.user = this.userService.GetUserById(this.id);
  //   console.log(this.config.data);
    
  //   this.postService.UpdatePosts(id).subscribe((response) => {
  //     console.log(response);
  //   }, (error) => {
  //     console.error(error);
  //   });
    // this.isUpdating = true;
    // this.isSubmitting = false;
    console.log(this.post.value.id);
    //this.user = this.userService.GetUserById(this.id);
    //console.log(this.config.data);
    const formData = { ...this.post.getRawValue() };
    this.postService.UpdatePosts(formData).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.error(error);
    });
    // setTimeout(() => {
    //   this.isUpdating = false;
    // }, 3000);
    this.getAll();
    this.mainRef.close({updated: true});
    //this.isUpdating = false;
  }
  onReset(){
  console.log(this.post.value);
  this.post.reset();
  //this.mainRef.close();
  }
  getAll(){
    this.postService.GetAllPosts().subscribe((data) => {
    
      console.log(data.result);
      
      this.selectedRow = data.result;
     
    });
  }
}
