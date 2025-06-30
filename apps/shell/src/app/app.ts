import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ClientFormComponent } from '@teddy/components';
import { combineLatest, filter } from 'rxjs';
import { UserService } from '@teddy/auth';

import { AppHeaderComponent } from './components/app-header/app-header.component';

@Component({
  imports: [RouterModule, AppHeaderComponent, ClientFormComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  showHeader = false;
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  ngOnInit() {
    combineLatest([
      this.userService.user$,
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
    ]).subscribe(([user, event]) => {
      if (user && event.urlAfterRedirects !== '/') {
        this.showHeader = true;
      } else {
        this.showHeader = false;
      }
    });
  }
}
