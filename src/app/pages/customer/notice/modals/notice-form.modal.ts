import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notice-form.modal.html'
})
export default class NoticeFormComponent implements OnChanges {
  @Input() editData: any | null = null
  @Output() submit = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fixed: [false],
      visibility: [true],
      target: ['회원', Validators.required],
      title: ['', Validators.required],
      date: [this.getNow(), Validators.required]
    })
  }

  private getNow(): string {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editData'] && this.editData) {
      const patchedData = {
        ...this.editData,
        date: this.formatDateForInput(this.editData.date)
      }
      this.form.patchValue(patchedData)
    }
  }

  private formatDateForInput(date: string | Date): string {
    return typeof date === 'string' ? date.slice(0, 16) : new Date(date).toISOString().slice(0, 16)
  }

  onSubmit() {
    if (this.form.invalid) return

    const data = this.form.value

    const notices = JSON.parse(localStorage.getItem('notices')!) || []

    if (!this.editData) {
      data.id = Date.now()
      notices.push(data)
    } else {
      const index = notices.findIndex((n: any) => n.id === this.editData.id)
      if (index !== -1) {
        notices[index] = { ...data, id: this.editData.id }
      }
    }

    localStorage.setItem('notices', JSON.stringify(notices))

    this.submit.emit(data)
  }

  onCancel() {
    this.cancel.emit()
  }
}
