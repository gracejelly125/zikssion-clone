import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  currentHeaderLabel = signal<string>('대시보드')

  setHeaderLabel(label: string) {
    this.currentHeaderLabel.set(label)
  }
}
