import { Component } from '@angular/core'
import { CATEGORIES, NOTICE_DATA } from '../../../data/notice-data'
import { CommonModule } from '@angular/common'
import { ClickOutsideDirective } from '../../../directives/click-outside.directive'
import { NoticeListItemComponent } from './components/notice-item.component'
import DropMenuComponent from '../../../modals/drop-menu/drop-menu.modal'
import NoticeFormComponent from './modals/notice-form.modal'

@Component({
  selector: 'app-customer-notice-page',
  imports: [CommonModule, ClickOutsideDirective, NoticeListItemComponent, DropMenuComponent, NoticeFormComponent],
  templateUrl: './customer-notice.page.html'
})
export default class CustomerNoticePage {
  notices = []
  categories = CATEGORIES

  isDropMenuOpen = false

  rightClickedItem: any = null
  contextMenuVisible = false
  contextMenuPosition = { top: 0, left: 0 }

  constructor() {
    this.notices = JSON.parse(localStorage.getItem('notices')!) || []
  }

  toggleDropMenu() {
    this.isDropMenuOpen = !this.isDropMenuOpen
  }

  closeDropMenu() {
    this.isDropMenuOpen = false
  }

  onRightClick(event: MouseEvent, item: any) {
    event.preventDefault()
    this.rightClickedItem = item
    this.contextMenuVisible = true
    this.contextMenuPosition = {
      top: event.clientY,
      left: event.clientX
    }
  }

  closeContextMenu() {
    this.contextMenuVisible = false
  }

  handleSortClick(label: string) {
    this.closeDropMenu()
  }

  handleContextItemClick(label: string) {
    this.closeContextMenu()
  }

  handleMenuClick(label: string) {
    this.closeDropMenu()
    this.closeContextMenu()
  }

  showForm = false

  openForm() {
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
  }

  submitForm(data: any) {
    this.notices = JSON.parse(localStorage.getItem('notices')!) || []
    this.closeForm()
  }
}
