import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification'

// let permissionGranted = await isPermissionGranted();
// if (!permissionGranted) {
//   const permission = await requestPermission();
//   permissionGranted = permission === 'granted';
// }
// if (permissionGranted) {

// }

export const info = ({ title = '', body = '', icon = '' }) => {
  sendNotification({ title, body, icon })
}
