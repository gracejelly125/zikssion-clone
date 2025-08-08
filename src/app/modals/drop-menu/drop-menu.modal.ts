import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'drop-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-menu.modal.html'
})
export default class DropMenuComponent {
  @Input() menuItems: { label: string; icon?: string }[] = []
  @Input() position?: { top: number; left: number }
  @Output() itemClick = new EventEmitter<string>()
}
