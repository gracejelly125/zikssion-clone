import { Component, signal } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { SIDEBAR_MENUS, SidebarMenu } from '../../data/aside-data'
import { MenuStateService } from '../../services/menu-state.service'
import { MenuItemComponent } from './components/menu-item/menu-item.component'

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterModule, CommonModule, MenuItemComponent],
  templateUrl: './aside.component.html'
})
export class AsideComponent {
  menus: SidebarMenu[] = SIDEBAR_MENUS

  openMenuLabel = signal<string | null>(null)

  constructor(
    public menuState: MenuStateService,
    private router: Router
  ) {}

  isMenuOpen(label: string): boolean {
    return this.openMenuLabel() === label
  }

  isActiveMenu(menu: SidebarMenu): boolean {
    const currentUrl = this.router.url
    return (
      (menu.route && currentUrl.startsWith(menu.route)) ||
      !!menu.children?.some((child) => currentUrl.startsWith(child.route))
    )
  }
}
