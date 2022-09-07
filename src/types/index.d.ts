declare module 'EVT' {
  export interface SettingListStateType {
    windowSizeList: Array<{
      id: number
      name: string
      width: number
      height: number
      toolbar: number
      class: string
    }>
    languageList: Array<{
      id: number
      name: string
      locale: string
      country: string
    }>
    themeList: Array<{
      id: number
      name: string
      class: string
    }>
  }

  export interface SettingStateType {
    themeId: number
    windowSizeId: number
    darkMode: auto
    isShowLogo: false
    isUseSysTitle: false
    isShowAnimation: true
    randomAnimate: true
    trayShow: false
    controlPosition: string
  }

  export interface RoutesDataType {
    path: string
    name: string
    component: any
    redirect?: string
    meta: {
      text: string
      icon: string
      isHide: boolean
    }
  }

  export interface RoutesDataStateType {
    menuRoutes: Array<RoutesDataType>
  }
}
