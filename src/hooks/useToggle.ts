export const useToggle = () => {
  const state = ref(sessionStorage.getItem('welcome') ? false : true)
  watch(state, (value) => {
    if (!value) {
      sessionStorage.setItem('welcome', 'true')
    } else {
      sessionStorage.removeItem('welcome')
    }
  })

  // const state = ref(true)

  const toggleState = (): void => {
    state.value = !state.value
  }

  return [state, toggleState as () => void] as const
}
