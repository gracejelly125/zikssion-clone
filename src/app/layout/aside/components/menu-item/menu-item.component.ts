import { Component, inject, input, model } from '@angular/core'
import { SidebarMenu } from '../../../../data/aside-data'
import { CommonModule } from '@angular/common'
import { MenuStateService } from '../../../../services/menu-state.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  menuState = inject(MenuStateService)
  menu = input.required<SidebarMenu>()
  selectedMenuLabel = model<string | null>('')

  selectMenu() {
    this.selectedMenuLabel.set(this.menu().label === this.selectedMenuLabel() ? null : this.menu().label)
  }
}
