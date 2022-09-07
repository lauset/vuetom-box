<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { listen } from '@tauri-apps/api/event'
import Toolbar from '@/components/Toolbar'
import Navbar from '@/components/Navbar'
import { setLanguage } from '@/i18n'
import useStoreSetting from '@/store/modules/settings'

const store = useStoreSetting()
const themeClass = computed(() => store.getThemeClass)
const winSizeClass = computed(() => store.getWindowSizeClass)

invoke('cmd1', { name: 'lauset' }).then(res => {
  console.log(res)
})

// await invoke("greet", { name: name.value });

invoke('cmd2', { number: 1 })
  .then(message => console.log(1, message))
  .catch(error => console.error(2, error))

let unlisten: any = null

const listenLanguage = async () => {
  unlisten = await listen('e-change-lang', event => {
    const { lang } = event.payload as { lang: string }
    console.log('change-lang: ', lang)
    setLanguage(lang)
  })
}

listenLanguage()

onMounted(() => {})

onUnmounted(() => {
  unlisten()
})
</script>

<template>
  <div id="app-root" :class="[themeClass, winSizeClass]">
    <Toolbar />
    <Navbar />
    <div class="h-screen pt-16">
      <router-view v-slot="{ Component, route }: any">
        <transition :name="route.meta?.transition || 'fade'" appear>
          <keep-alive v-if="route.meta?.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';

#app-root {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

#app-root {
  @each $t in $themes {
    &.#{$t} {
      color: darken(map-get($themes-color-700, $t), 10%);
      background-image: var(--screen-linear-top), var(--screen-linear-left), var(--screen-bg-url);
      background-color: map-get($themes-color, $t);
    }
  }
}

.dark {
  #app-root {
    @each $t in $themes {
      &.#{$t} {
        color: map-get($themes-color-100, $t);
        background-image: var(--screen-linear-top), var(--screen-linear-left), var(--screen-bg-url);
        background-color: map-get($themes-color, $t);
      }
    } 
  }
}

</style>