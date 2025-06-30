import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@teddy/auth';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent implements OnInit {
  readonly router = inject(Router);
  readonly userService = inject(UserService);
  userName$ = this.userService.user$;
  currentRoute = '';
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = (event as NavigationEnd).urlAfterRedirects;
      });
  }
  handleLogout(): void {
    this.userService.forgetUser();
    this.router.navigate(['/']);
  }
}
