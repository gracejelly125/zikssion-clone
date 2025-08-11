import { computed, inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Router } from '@angular/router'
import { BaseStore } from './base.store'

interface UserData {
  nickname: string
  email: string
  password?: string
}

const LOCAL_STORAGE_USER_DATA_KEY = 'userData'
const SESSION_STORAGE_AUTH_TOKEN_KEY = 'accessToken'

type State = {
  user: UserData | null
  isLoggedIn: boolean
}

@Injectable({ providedIn: 'root' })
export default class UserStore extends BaseStore<State> {
  private readonly router = inject(Router)
  private platformId = inject(PLATFORM_ID)

  public readonly isLoggedIn = computed(() => this.get().isLoggedIn)

  public readonly currentUser = computed(() => this.get().user)

  constructor() {
    let initialIsLoggedIn = false
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      initialIsLoggedIn = !!sessionStorage.getItem(SESSION_STORAGE_AUTH_TOKEN_KEY)
    }

    super({
      user: null,
      isLoggedIn: initialIsLoggedIn
    })

    if (isPlatformBrowser(this.platformId) && this.get().isLoggedIn) {
      const storedUserDataString = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)
      if (storedUserDataString) {
        const storedUser = JSON.parse(storedUserDataString) as UserData
        this.updateState({ user: storedUser })
        alert('기존 정보로 자동 로그인되었습니다.')
      } else {
        this.clearAuthToken()
        this.updateState({ isLoggedIn: false, user: null })
        alert('로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.')
        this.router.navigate(['/sign-in'])
      }
    }
  }

  async login(email: string): Promise<UserData | null> {
    if (!isPlatformBrowser(this.platformId)) {
      alert('로그인 기능은 브라우저에서만 사용할 수 있습니다.')
      return null
    }

    const storedUserDataString = localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY)
    if (!storedUserDataString) {
      alert('회원가입된 사용자가 없습니다.')
      return null
    }

    const storedUser = JSON.parse(storedUserDataString)

    if (storedUser.email !== email) {
      alert('일치하는 사용자 정보가 없습니다.')
      return null
    }

    const fakeToken = `fake-jwt-token-for-${email}-${Date.now()}`
    sessionStorage.setItem(SESSION_STORAGE_AUTH_TOKEN_KEY, fakeToken)
    this.updateState({ isLoggedIn: true, user: storedUser })

    alert('로그인되었습니다!')
    return storedUser
  }

  async logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.clearAuthToken()
    }
    this.updateState({ user: null, isLoggedIn: false })
    this.router.navigate(['/sign-in'])
    alert('로그아웃되었습니다.')
  }

  private clearAuthToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(SESSION_STORAGE_AUTH_TOKEN_KEY)
    }
  }

  setUser(user: UserData | null) {
    this.updateState({ user })
    this.updateState({ isLoggedIn: !!user })
  }

  clearUser() {
    this.updateState({ user: null, isLoggedIn: false })
    if (isPlatformBrowser(this.platformId)) {
      this.clearAuthToken()
    }
  }
}
