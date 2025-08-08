import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
  @Input() keyword = ''
  @Output() search = new EventEmitter<string>()

  // onSubmit(event: Event) {
  //   event.preventDefault()
  //   this.search.emit(this.keyword.trim())
  // }

  onInput(value: string) {
    this.search.emit(value.trim())
  }

  onEnter(event: Event) {
    event.preventDefault()
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === 'Enter') {
      this.search.emit(this.keyword.trim())
    }
  }
}
