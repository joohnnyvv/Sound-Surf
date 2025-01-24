import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item) as T
    }
    return null
  }
}
