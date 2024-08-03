import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { UserComponent } from './body/user/user.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ButtonModule, InputTextModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CRUD';
  items: MenuItem[] | undefined;
  loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
  ngOnInit() {
    this.items = [
      {
        icon: "pi pi-home",
        label: '<b>Home</b>',
        escape: false,
        routerLink: ['/']
      },
      {
        icon: "pi pi-user",
        label: '<b>User View</b>',
        escape: false,
        routerLink: ['/user']
      },
      {
        icon: "pi pi-file-edit",
        label: '<b>Post View</b>',
        escape: false,
        routerLink: ['/post']
      },
    ]
  }
}
