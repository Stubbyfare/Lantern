const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('lantern', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  installApp: (manifest) => ipcRenderer.invoke('install-app', manifest),
});
