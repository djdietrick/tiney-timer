import { app, BrowserWindow, nativeTheme } from 'electron'
import MainTray from './tray';
import TrayWindow from './tray-window';
import path from 'path';

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname
}

let tray
let trayWindow

function createWindow () {

  trayWindow = new TrayWindow(process.env.APP_URL, false);
  tray = new MainTray(path.join(__dirname, 'resources', 'icon.ico'), trayWindow);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray = null
    trayWindow = null;
    app.quit()
  }
})

app.on('activate', () => {
  if (trayWindow === null) {
    createWindow()
  }
})
