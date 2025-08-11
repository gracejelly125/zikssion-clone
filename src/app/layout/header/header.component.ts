import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import UserStore from '../../stores/user.store'
import { MenuStateService } from '../../services/menu-state.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private router = inject(Router)
  public userStore = inject(UserStore)

  public currentHeaderLabel = '대시보드'

  constructor(public menuState: MenuStateService) {}

  onLogout() {
    this.userStore.logout()
  }

  onLogin() {
    this.router.navigate(['/sign-in'])
  }
}
