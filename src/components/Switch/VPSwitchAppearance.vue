<script lang="ts" setup>
import { computed, watch } from 'vue'
import { APPEARANCE_KEY } from '@/common/enum'
import useStoreSetting from '@/store/modules/settings'
import VPSwitch from './VPSwitch.vue'
import VPIconSun from '../Icons/VPIconSun.vue'
import VPIconMoon from '../Icons/VPIconMoon.vue'

const settings = useStoreSetting()

const darkClass = computed(() => settings.getDarkMode)

const currentSetting = computed(() => settings.getSetting)

const toggle = typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const { classList } = document.documentElement

  let userPreference: string

  if (darkClass) {
    userPreference = darkClass.value
  } else {
    userPreference = localStorage.getItem(APPEARANCE_KEY) || 'auto'
  }

  let isDark = userPreference === 'auto'
    ? query.matches
    : userPreference === 'dark'

  setClass(isDark)

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  function toggle() {
    setClass((isDark = !isDark))

    userPreference = isDark
      ? query.matches ? 'auto' : 'dark'
      : query.matches ? 'light' : 'auto'

    settings.DARK_MODE(userPreference)
    // localStorage.setItem(APPEARANCE_KEY, userPreference)
  }

  function setClass(dark: boolean): void {
    classList[dark ? 'add' : 'remove']('dark')
  }

  return toggle
}

watch(
  currentSetting,
  (e) => {
    console.log('设置变动 >>> ', e)
    settings.SET_SETTING(e || undefined)
  },
  { deep: true }
)
</script>

<template>
  <VPSwitch
    class="VPSwitchAppearance"
    aria-label="toggle dark mode"
    @click="toggle"
  >
    <VPIconSun class="sun" />
    <VPIconMoon class="moon" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /* transform: translateX(18px); */
}
</style>
