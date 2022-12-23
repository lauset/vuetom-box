import {
  arch,
  platform,
  tempdir,
  type as otype,
  version,
} from '@tauri-apps/api/os'
import { t } from '@/i18n'

export default {
  setup() {
    const { charging, chargingTime, dischargingTime, level } = useBattery()
    const { isOnline, downlink, effectiveType, type } = useNetwork()
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
      systemInfo.osType = await otype()
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
              <box-card class='col-span-1' title={'电量与网络'}>
                <div>
                  <p>
                    <br />
                    {charging.value ? '充电中' : '未充电'}({level.value * 100}%)
                    <br />
                    充满要{chargingTime.value / 60}分钟
                    <br />
                    还能用{dischargingTime.value / 60}分钟
                  </p>
                  <p>
                    <br />
                    {isOnline ? (
                      <span style='color: green;'>已联网</span>
                    ) : (
                      <span style='color: red;'>未联网</span>
                    )}
                    <br />
                    当前是<b>{effectiveType.value}</b>网
                    <br />
                    下载网速为{downlink.value}Mbps
                  </p>
                  <p>
                    <span class='py-2 opacity-60'>
                      注: 部分浏览器内核不支持
                    </span>
                  </p>
                </div>
              </box-card>
            </div>
            <div class={'w-full pt-8'}>
              <box-card class='col-span-1' title={'信息'}>
                <p class='p-1'>操作系统: {systemInfo.osType}</p>
                <p class='p-1'>系统版本: {systemInfo.osVersion}</p>
                <p class='p-1'>系统CPU: {systemInfo.archName}</p>
                <p class='p-1'>系统标识: {systemInfo.platformName}</p>
                <p class='p-1'>系统目录: {systemInfo.tempdirPath}</p>
              </box-card>
            </div>
          </div>
          <div class='flex-grow'></div>
        </div>
      </div>
    )
  },
}
