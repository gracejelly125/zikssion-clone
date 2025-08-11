import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-business-info-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './business-info-form.component.html'
})
export class BusinessInfoFormComponent {
  form: FormGroup
  private storageKey = 'businessInfo'

  constructor(private fb: FormBuilder) {
    const savedData = localStorage.getItem(this.storageKey)
    const initialData = savedData ? JSON.parse(savedData) : {}

    this.form = this.fb.group({
      companyName: [initialData.companyName || '', Validators.required],
      ceoName: [initialData.ceoName || '', Validators.required],
      address: [initialData.address || '', Validators.required],
      contactNumber: [initialData.contactNumber || '', Validators.required],
      email: [initialData.email || '', [Validators.required, Validators.email]],
      businessRegistrationNumber: [initialData.businessRegistrationNumber || '', Validators.required],
      copyright: [initialData.copyright || '', Validators.required]
    })

    this.form.updateValueAndValidity()
  }

  onSubmit() {
    if (this.form.valid) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.form.value))
      alert('저장 완료!')
    } else {
      console.log('폼이 유효하지 않습니다.')
    }
  }
}
