// Theme manager: light, dark, system
// Applies/removes .dark class on <html> and persists choice in localStorage

const STORAGE_KEY = 'onton-theme'

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(mode) {
  const isDark = mode === 'dark' || (mode === 'system' && getSystemDark())
  document.documentElement.classList.toggle('dark', isDark)
}

export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY) || 'system'
  applyTheme(stored)

  // Listen for OS theme changes when in system mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = localStorage.getItem(STORAGE_KEY) || 'system'
    if (current === 'system') applyTheme('system')
  })

  return stored
}

export function setTheme(mode) {
  localStorage.setItem(STORAGE_KEY, mode)
  applyTheme(mode)
}

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || 'system'
}
