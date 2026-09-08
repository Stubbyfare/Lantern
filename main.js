const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const indexPath = path.join(__dirname, 'index.html');
  win.loadFile(indexPath);

  // Optional: open devtools when ELECTRON_DEV env set
  if (process.env.ELECTRON_DEV) {
    win.webContents.openDevTools({ mode: 'right' });
  }

  // Handle open-external requests
  ipcMain.handle('open-external', (_, url) => {
    return shell.openExternal(url);
  });

  // Placeholder for installing an "app"
  ipcMain.handle('install-app', (_, manifest) => {
    console.log('Install app request:', manifest);
    // TODO: implement secure app installation flow
    return { ok: true, message: 'Install flow not implemented yet' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
