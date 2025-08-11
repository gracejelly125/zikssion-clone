import { Component, inject, output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import UserStore from '../../stores/user.store'

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.page.html'
})
export default class SignInComponent {
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private userStore = inject(UserStore)

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  loginEvent = output<{ email: string; password: string }>()

  async onSubmit() {
    if (this.form.valid) {
      const enteredEmail = this.form.value.email
      const enteredPassword = this.form.value.password

      const storedUserDataString = localStorage.getItem('userData')

      if (storedUserDataString) {
        const storedUserData = JSON.parse(storedUserDataString)

        if (enteredEmail === storedUserData.email && enteredPassword === storedUserData.password) {
          const loggedInUser = await this.userStore.login(enteredEmail!)

          if (loggedInUser) {
            this.loginEvent.emit({ email: enteredEmail!, password: enteredPassword! })
            this.router.navigate(['/dashboard'])
          } else {
            console.error('UserStore 로그인 처리 중 예기치 않은 오류 발생.')
          }
        } else {
          alert('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.')
          console.log('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.')
        }
      } else {
        alert('로그인 실패: 저장된 사용자 데이터가 없습니다. 먼저 회원가입을 해주세요.')
        console.log('로그인 실패: 저장된 사용자 데이터가 없습니다.')
      }
    } else {
      console.log('로그인 실패: 유효하지 않은 폼 입력입니다.')
    }
  }

  goToSignUp() {
    this.router.navigate(['/sign-up'])
  }
}
