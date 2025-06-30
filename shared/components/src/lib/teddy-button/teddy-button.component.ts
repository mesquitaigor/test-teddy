import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-teddy-button',
  imports: [CommonModule],
  templateUrl: './teddy-button.component.html',
  styleUrl: './teddy-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeddyButtonComponent {
  @Input() @HostBinding('class.disabled') disabled = false;
  @Input() @HostBinding('class.fill') fill = false;
  @Input() size: '' | 'large' | 'small' | 'medium' = '';
  @Input() apparence: 'normal' | 'icon' | 'outline' | 'ghost' = 'normal';

  @HostBinding('class.large') get isLarge(): boolean {
    return this.size === 'large';
  }
  @HostBinding('class.small') get isSmall(): boolean {
    return this.size === 'small';
  }
  @HostBinding('class.normal') get isNormal(): boolean {
    return this.apparence === 'normal';
  }
  @HostBinding('class.ghost') get isGhost(): boolean {
    return this.apparence === 'ghost';
  }
  @HostBinding('class.icon') get isIcon(): boolean {
    return this.apparence === 'icon';
  }
  @HostBinding('class.outline') get isOutline(): boolean {
    return this.apparence === 'outline';
  }
  @HostBinding('class.medium') get isMedium(): boolean {
    return this.size === 'medium';
  }
}
