'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'โปรแกรมบริหารจัดการข้อมูลลูกค้า',
    icon: './app/icon/icon.png'
  });

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.maximize();
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
