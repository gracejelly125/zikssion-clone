import { Component, computed, input, signal } from '@angular/core'
import { CATEGORIES } from '../../../data/notice-data'
import { CommonModule } from '@angular/common'
import { ClickOutsideDirective } from '../../../directives/click-outside.directive'
import { NoticeListItemComponent } from './components/notice-item/notice-item.component'
import DropMenuComponent from '../../../modals/drop-menu/drop-menu.modal'
import NoticeFormComponent from './modals/notice-form.modal'
import { FormsModule } from '@angular/forms'
import { SearchFormComponent } from './components/search-form/search-form.component'

export type Notice = {
  id: number
  fixed: boolean
  visibility: boolean
  target: string
  title: string
  date: string
}
@Component({
  selector: 'app-customer-notice-page',
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective,
    NoticeListItemComponent,
    DropMenuComponent,
    NoticeFormComponent,
    SearchFormComponent
  ],
  templateUrl: './customer-notice.page.html'
})
export default class CustomerNoticePage {
  notices: Notice[] = []
  categories = CATEGORIES
  sortOrder: 'asc' | 'desc' = 'desc'
  sortedNotices = signal<Notice[]>([])

  excelUrl = '/assets/excel_icon.svg'

  isDropMenuOpen = false

  rightClickedItem: any = null
  contextMenuVisible = false
  contextMenuPosition = { top: 0, left: 0 }

  selectedNotice: any = null

  searchKeyword = signal('')

  itemsPerPage = signal<number>(5)
  currentPage = signal(1)

  filteredNotices = computed(() => {
    const trimmed = this.searchKeyword().trim().toLowerCase()
    const list = this.sortedNotices()
    if (!trimmed) return list
    return list.filter((n) => n.title.toLowerCase().includes(trimmed))
  })

  pagedNotices = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage()
    return this.filteredNotices().slice(start, start + this.itemsPerPage())
  })

  totalPages = computed(() => {
    const count = Math.ceil(this.filteredNotices().length / this.itemsPerPage())
    return Array.from({ length: count }, (_, i) => i + 1)
  })

  constructor() {
    this.notices = JSON.parse(localStorage.getItem('notices')!) || []
    this.sortNotices()
  }

  onItemsPerPageChange() {
    this.currentPage.set(1)
  }

  onSearch(keyword: string) {
    this.searchKeyword.set(keyword)
    this.currentPage.set(1)
    const trimmed = keyword.trim().toLowerCase()

    if (trimmed === '') {
      this.sortNotices()
      return
    }

    const filtered = this.notices
      .filter((notice) => notice.title.toLowerCase().includes(trimmed))
      .sort((a, b) => (this.sortOrder === 'asc' ? a.id - b.id : b.id - a.id))

    this.sortedNotices.set(filtered)
  }

  sortNotices() {
    const sorted = [...this.notices].sort((a, b) => {
      return this.sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    })
    this.sortedNotices.set(sorted)
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
    this.sortOrder = label === '오름차순' ? 'asc' : 'desc'
    this.sortNotices()
    this.currentPage.set(1)
    this.closeDropMenu()
  }

  handleMenuClick(label: string) {
    this.closeDropMenu()
    this.closeContextMenu()

    if (label === '수정') {
      this.selectedNotice = this.rightClickedItem
      this.showForm = true
      return
    }

    if (label === '삭제') {
      this.deleteNotice(this.rightClickedItem)
      return
    }

    if (label === '오름차순' || label === '내림차순') {
      this.handleSortClick(label)
    }
  }

  showForm = false

  openForm() {
    this.showForm = true
  }

  closeForm() {
    this.showForm = false
    this.selectedNotice = null
  }

  submitForm(data: any) {
    const notices = JSON.parse(localStorage.getItem('notices')!) as Notice[]

    if (this.selectedNotice) {
      const index = notices.findIndex((n) => n.id === this.selectedNotice.id)
      if (index !== -1) {
        notices[index] = { ...this.selectedNotice, ...data }
      }
    }

    localStorage.setItem('notices', JSON.stringify(notices))
    this.notices = notices
    this.sortNotices()

    this.selectedNotice = null
    this.closeForm()
  }

  deleteNotice(target: any) {
    const notices = JSON.parse(localStorage.getItem('notices')!) as Notice[]
    const updated = notices.filter((n) => n.id !== target.id)
    localStorage.setItem('notices', JSON.stringify(updated))
    this.notices = updated
    this.sortNotices()
  }
}
