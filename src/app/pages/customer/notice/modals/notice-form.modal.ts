import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-notice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './notice-form.modal.html'
})
export default class NoticeFormComponent {
  @Output() submit = new EventEmitter<any>()
  @Output() cancel = new EventEmitter<void>()

  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fixed: [false],
      visibility: [true],
      target: ['회원', Validators.required],
      title: ['', Validators.required],
      date: [new Date().toISOString().slice(0, 16), Validators.required]
    })
  }

  onSubmit() {
    console.debug(this.form.value)

    if (this.form.valid) {
      this.submit.emit(this.form.value)
    }

    const notices = JSON.parse(localStorage.getItem('notices')!) || []
    notices.push(this.form.value)
    localStorage.setItem('notices', JSON.stringify(notices))
  }

  onCancel() {
    this.cancel.emit()
  }
}
