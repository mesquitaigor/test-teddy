import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@teddy/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  readonly router = inject(Router);
  readonly userService = inject(UserService);
  userName$ = this.userService.user$;
  user = '';
  handleLogout(): void {
    this.userService.forgetUser();
    this.router.navigate(['/']);
  }
}
