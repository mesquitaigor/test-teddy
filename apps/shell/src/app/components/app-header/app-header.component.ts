import { Component, inject, OnInit } from '@angular/core';
import { TeddyButtonComponent } from '@teddy/components';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '@teddy/auth';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TeddyButtonComponent],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent implements OnInit {
  readonly router = inject(Router);
  private readonly userService = inject(UserService);
  userName$ = this.userService.user$;
  currentRouter = '';
  user = '';
  openMenu = false;
  ngOnInit(): void {
    this.currentRouter = this.router.url;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRouter = event.urlAfterRedirects;
      });
  }
  handleLogout(): void {
    this.userService.forgetUser();
    this.router.navigate(['/']);
  }
  handleRedirect(uri: string): void {
    this.router.navigate([uri]);
    this.openMenu = false;
  }
}
