import { defineStore } from 'pinia'
import {
  SETTING_KEY,
  THEME_ID,
  WINSIZE_ID,
  LANG_ID,
  APPEARANCE_KEY,
} from '@/common/enum'
import store from '../index'
import useStoreSettingList from './settingList'
import type { SettingStateType } from 'EVT'

const defaultSettings: SettingStateType = {
  themeId: 1,
  windowSizeId: 0,
  darkMode: 'auto',
  isShowLogo: false,
  isUseSysTitle: false,
  isShowAnimation: true,
  randomAnimate: true,
  trayShow: false,
  controlPosition: 'left',
}

let localSettings: SettingStateType = defaultSettings
try {
  localSettings = JSON.parse(localStorage.getItem(SETTING_KEY) || '')
} catch {
  localSettings = defaultSettings
} finally {
  if (JSON.stringify(localSettings) == '{}') localSettings = defaultSettings
  localStorage.removeItem(SETTING_KEY)
  localStorage.setItem(SETTING_KEY, JSON.stringify(localSettings))
}

const useStore = defineStore({
  id: 'setting',
  state: () => ({
    langId: localStorage.getItem(LANG_ID) || 0,
    ...localSettings,
  }),
  getters: {
    // 获取当前设置信息
    getSetting: state => state.$state,
    // 判断是否使用系统标题栏
    hasSysTitle: state => state.isUseSysTitle,
    // 判断是否开启动画
    hasAnim: state => state.isShowAnimation,
    // 获取当前的主题样式
    getThemeClass: state => {
      const settingList = useStoreSettingList()
      const theme = settingList.themeList.find(
        theme => theme.id == state.themeId,
      )
      return theme && theme.class
    },
    // 获取当前尺寸样式
    getWindowSizeClass: state => {
      const settingList = useStoreSettingList()
      const size = settingList.windowSizeList.find(
        size => size.id == state.windowSizeId,
      )
      return size && size.class
    },
    // 获取当前使用的语言
    getLangLocale: state => {
      const settingList = useStoreSettingList()
      const lang = settingList.languageList.find(
        lang => lang.id == state.langId,
      )
      return lang && lang.locale
    },
    // 获取当前使用亮暗主题
    getDarkMode: state => {
      return state.darkMode
    },
  },
  actions: {
    SET_SETTING(data: any) {
      localStorage.setItem(SETTING_KEY, JSON.stringify(data))
    },
    SHOW_LOGO(data: boolean) {
      this.isShowLogo = data
    },
    SHOW_ANIM(data: boolean) {
      this.isShowAnimation = data
    },
    BTN_POSITION(data: string) {
      this.controlPosition = data
    },
    SHOW_TRAY(data: boolean) {
      this.trayShow = data
    },
    THEME_ID(data: number) {
      this.themeId = data
      localStorage.setItem(THEME_ID, data.toString())
    },
    WINSIZE_ID(data: number) {
      this.windowSizeId = data
      localStorage.setItem(WINSIZE_ID, data.toString())
    },
    LANG_ID(data: number) {
      this.langId = data
      localStorage.setItem(LANG_ID, data.toString())
    },
    DARK_MODE(dark: string) {
      this.darkMode = dark
      localStorage.setItem(APPEARANCE_KEY, dark)
    },
  },
})

export default function useStoreSetting() {
  return useStore(store)
}
