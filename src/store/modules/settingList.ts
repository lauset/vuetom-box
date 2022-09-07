import { defineStore } from 'pinia'
import config from '@/common/config'
import store from '../index'
import type { SettingListStateType } from 'EVT'

const { windowSizeList, languageList, themeList } = config

const useStore = defineStore({
  id: 'settingList',
  state: (): SettingListStateType => ({
    windowSizeList,
    languageList,
    themeList,
  }),
  getters: {
    getThemes() {
      return this.themeList
    },
    getWindowSizes() {
      return this.windowSizeList
    },
    getLanguages() {
      return this.languageList
    },
  },
  actions: {},
})

export default function useStoreSettingList() {
  return useStore(store)
}
