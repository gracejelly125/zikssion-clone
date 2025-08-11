import { Component, input, model, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
  keyword = model<string>('')
  search = output<string>()

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.keyword.set(value)
    this.search.emit(value.trim())
  }

  onEnter(event: Event) {
    event.preventDefault()
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === 'Enter') {
      this.search.emit(this.keyword().trim())
    }
  }
}
