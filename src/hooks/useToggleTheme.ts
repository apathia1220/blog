export const useToggleTheme = () => {
  // false = light theme, true = dark theme
  // const themeState = ref(true)
  const currentTheme = localStorage.getItem('theme')
  const themeState = ref(currentTheme && currentTheme === 'theme-light' ? false : true)

  const initTheme = () => {
    if (themeState.value) {
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
    }
  }
  initTheme()

  // const toggleTheme = () => {
  //   if (themeState.value) {
  //     if (document.body.classList.contains('theme-dark')) {
  //       document.body.classList.remove('theme-dark')
  //     }
  //     document.body.classList.add('theme-light')
  //     themeState.value = false
  //   } else {
  //     if (document.body.classList.contains('theme-light')) {
  //       document.body.classList.remove('theme-light')
  //     }
  //     document.body.classList.add('theme-dark')
  //     themeState.value = true
  //   }
  // }

  const toggleTheme = () => {
    const themeValue = localStorage.getItem('theme')
    if (themeValue) {
      if (themeValue === 'theme-light') {
        document.body.classList.remove('theme-light')
        document.body.classList.add('theme-dark')
        localStorage.setItem('theme', 'theme-dark')
        themeState.value = true
      } else {
        document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-light')
        localStorage.setItem('theme', 'theme-light')
        themeState.value = false
      }
    } else {
      if (document.body.classList.contains('theme-dark')) {
        document.body.classList.remove('theme-dark')
        localStorage.setItem('theme', 'theme-light')
        themeState.value = false
      } else {
        document.body.classList.add('theme-dark')
        localStorage.setItem('theme', 'theme-dark')
        themeState.value = true
      }
    }
  }

  return {
    themeState,
    toggleTheme
  }
}
