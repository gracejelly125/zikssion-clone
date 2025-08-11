import { Component, inject, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.page.html'
})
export default class SignUpPage {
  private fb = inject(FormBuilder)
  private router = inject(Router)

  form = this.fb.group({
    nickname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  signUpEvent = output<{ nickname: string; email: string; password: string }>()

  onSubmit() {
    if (this.form.valid) {
      const userData = this.form.value as { nickname: string; email: string; password: string }
      this.signUpEvent.emit(userData)

      localStorage.setItem('userData', JSON.stringify(userData))
      alert('회원가입이 완료되었습니다!')
      this.router.navigate(['/sign-in'])
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in'])
  }
}
