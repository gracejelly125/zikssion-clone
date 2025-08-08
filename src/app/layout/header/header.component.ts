import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuStateService } from '../../services/menu-state.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public menuState: MenuStateService) {}
}
