import { useBattery } from '@vueuse/core'
import { arch, platform, tempdir, type, version } from '@tauri-apps/api/os'
import { t } from '@/i18n'

export default {
  setup() {
    const { charging, chargingTime, dischargingTime, level } = useBattery()
    const systemInfo = reactive({
      archName: '',
      platformName: '',
      tempdirPath: '',
      osType: '',
      osVersion: '',
    })

    const getSystemInfo = async () => {
      systemInfo.archName = await arch()
      systemInfo.platformName = await platform()
      systemInfo.tempdirPath = await tempdir()
      systemInfo.osType = await type()
      systemInfo.osVersion = await version()
    }

    onMounted(() => {
      getSystemInfo()
    })

    return () => (
      <div class='w-full'>
        {/* <h1>{t('menus.info')}</h1> */}
        <div class='flex w-full'>
          <div class='flex-grow'></div>
          <div class='flex-grow-0 w-4/5 max-w-xl'>
            <div class='pt-8 grid grid-cols-2 gap-6'>
              <div class='col-span-1'></div>
              <box-card class='col-span-1' title={'电量'}>
                <div>
                  <p>{charging.value ? '充电中' : '未充电'}</p>
                  <p>{level.value * 100}%</p>
                  <p>还可用{dischargingTime.value / 60}分钟</p>
                </div>
              </box-card>
            </div>
            <div class={'w-full pt-8'}>
              <box-card class='col-span-1' title={'信息'}>
                <p>操作系统: {systemInfo.osType}</p>
                <p>系统版本: {systemInfo.osVersion}</p>
                <p>系统CPU: {systemInfo.archName}</p>
                <p>系统标识: {systemInfo.platformName}</p>
                <p>系统目录: {systemInfo.tempdirPath}</p>
              </box-card>
            </div>
          </div>
          <div class='flex-grow'></div>
        </div>
      </div>
    )
  },
}
