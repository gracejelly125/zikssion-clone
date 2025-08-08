import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'notice-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-item.component.html'
})
export class NoticeListItemComponent {
  @Input() item!: any
  @Input() index!: number
  @Output() contextMenu = new EventEmitter<MouseEvent>()

  handleContextMenu(event: MouseEvent) {
    event.preventDefault()
    this.contextMenu.emit(event)
  }
}
