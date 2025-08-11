// import { computed, inject, Injectable } from '@angular/core'
// import { Router } from '@angular/router'
// import { UserDto, UserService } from '@api-client'
// import { BaseStore, ToastService } from '@client-libs'
// import { AdminRoleLevel, UserRoleLevel } from '@common'
// import { lastValueFrom } from 'rxjs'

// type State = {
//   user: UserDto | null
// }

// @Injectable({ providedIn: 'root' })
// export class UserStore extends BaseStore<State> {
//   private readonly userService = inject(UserService)
//   private readonly router = inject(Router)
//   private readonly toastService = inject(ToastService)

//   public readonly isAdmin = computed(
//     () => UserRoleLevel[this.$user()?.role as keyof typeof UserRoleLevel] >= AdminRoleLevel
//   )

//   constructor() {
//     super({
//       user: null
//     })
//   }

//   /**
//    * @name fetch
//    * @description Fetches the current user from the server and updates the store.
//    * @returns {Promise<UserDto>}
//    */
//   async fetch(): Promise<UserDto> {
//     const UserDto: UserDto = await lastValueFrom(this.userService.userControllerGetMe())
//     this.updateState({ user: UserDto })
//     return UserDto
//   }

//   async logout() {
//     await this.localStorageService.clear()
//     this.router.navigate(['/'])
//     this.toastService.success('로그아웃')
//   }

//   setUser(user: UserDto | null) {
//     this.updateState({ user })
//   }

//   clearUser() {
//     this.updateState({ user: null })
//   }
// }
