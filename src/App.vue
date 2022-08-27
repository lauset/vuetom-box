<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
import { listen } from '@tauri-apps/api/event'
import Toolbar from '@/components/Toolbar'
import Navbar from '@/components/Navbar'

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
    console.log('change-lang: ', event)
  })
}

listenLanguage()

onMounted(() => {})

onUnmounted(() => {
  unlisten()
})
</script>

<template>
  <div>
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
