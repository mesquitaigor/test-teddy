import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutofocusDirective } from './autofocus.directive';
import { TeddyButtonComponent } from './teddy-button/teddy-button.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-identification',
  imports: [TeddyButtonComponent, CommonModule, FormsModule, AutofocusDirective],
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.scss'],
})
export class UserIdentificationComponent {
  user = '';
  private router = inject(Router);
  private readonly userService = inject(UserService);

  handleEntry(): void {
    if (!this.user) {
      alert('Digite seu nome');
      return;
    }
    this.userService.identifyUser(this.user);
    this.router.navigate(['/clients']);
  }
}
