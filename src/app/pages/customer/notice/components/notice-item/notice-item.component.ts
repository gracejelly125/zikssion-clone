import { Component, input, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Notice } from '../../customer-notice.page'

@Component({
  selector: 'app-notice-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-item.component.html'
})
export class NoticeListItemComponent {
  item = input.required<Notice>()
  index = input.required<number>()
  contextMenu = output<MouseEvent>()

  handleContextMenu(event: MouseEvent) {
    event.preventDefault()
    this.contextMenu.emit(event)
  }
}
