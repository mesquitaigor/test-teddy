import { NavigationEnd, Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@teddy/auth';
import { filter } from 'rxjs';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  readonly router = inject(Router);
  private readonly userService = inject(UserService);
  userName$ = this.userService.user$;
  currentRouter: string = '';
  user = '';
  ngOnInit(): void{
    
    this.currentRouter = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRouter = event.urlAfterRedirects;
      });
  }
  handleLogout(): void {
    this.userService.forgetUser();
    this.router.navigate(['/']);
  }
}
