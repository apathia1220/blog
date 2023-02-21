import { defineStore } from 'pinia'

type Theme = 'theme-light' | 'theme-dark'

const setTheme = (theme: Theme) => {
  if (theme === 'theme-light') {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  } else if (theme === 'theme-dark') {
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
  }
}
