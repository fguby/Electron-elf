// Modules to control application life and create native browser window
const electron = require('electron')
const {app, Menu,Tray, BrowserWindow,shell} = require('electron')
const path = require('path');
var appTray;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
//菜单栏图标的位置
var iconX = 0;
var iconY = 0;

//窗口id值
var windowId;
//窗口对象
var windowobj;

function createWindow () {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    windowobj = {
      x:width - 300,
      y:height - 500,
      width: 300,
      height: 500,
      maximizable: false,
      minimizable: false,
      resizable: false,
      fullscreenable: false,
      frame:false,
      transparent: true,
      hasShadow:false,
      alwaysOnTop: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        nodeIntegration: false
      }
    }
      // Create the browser window.
    mainWindow = new BrowserWindow(windowobj)
    windowId = mainWindow.id;
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '/index.html'))

    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })


   //系统托盘右键菜单
   var trayMenuTemplate = [
      {
          label: '更换模型',
          type: 'submenu',
          icon: path.join(__dirname, '/img/Fairy44 - Face #2220.png'),
          submenu: [
              {
                label:'干物妹小埋',
                type:'radio',
                checked:true,
                click:function(menuItem, browserWindow, event) {
                  changeModel('/index.html');
               }
              },
              {
                label:'药水制作师小萝莉',
                type:'radio',
                click:function(menuItem, browserWindow, event) {
                  changeModel('/view/pio.html');
               }
              },
              {
                label:'二次元姐妹花',
                type:'radio',
                click:function(menuItem, browserWindow, event) {
                  changeModel('/view/sisters.html');
               }
              },
              {
                label:'从零开始的异世界生活：蕾姆',
                type:'radio',
                click:function(menuItem, browserWindow, event) {
                  changeModel('/view/rem.html');
               }
              },
              {
                label:'路人女主养成方法：加藤惠',
                type:'radio',
                click:function(menuItem, browserWindow, event) {
                  changeModel('/view/katou.html');
               }
              },
          ]
      },
      {
        type:'separator'
      },
      {
          label: '🎧  音效',
          type:'checkbox'
      },
      {
          label: '💰  赞助',
          click:function(menuItem, browserWindow, event){
              wechatpay(appTray.getBounds(),browserWindow)
          }
      },
      {
        label: 'website',
        click:function() {
           shell.openExternal('https://github.com/fguby');
        }
      },
      {
        type:'separator'
      },
      {
          label: '退出',
          role: 'quit'
      }
  ];

  // //系统托盘图标目录
  trayIcon = path.join(__dirname, '');
  appTray = new Tray(path.join(trayIcon, './img/tomato.png'));
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
   //设置此托盘图标的悬停提示内容
  appTray.setToolTip('还快不点一下.');
   //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

//添加自动播放
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function wechatpay(bounds,browserWindow){
    //let displays = electron.screen.getCursorScreenPoint()
    let wechatWindow = new BrowserWindow({
      x: bounds.x - 100,
      y: bounds.y,
      width:300,
      height:400,
      title:'资助贫困人口'
    });
    wechatWindow.loadFile(path.join(__dirname, '/view/wechat.html'))
}

//切换模型
function changeModel(modelpath) {
    var window = BrowserWindow.fromId(windowId);
    window.close();
    mainWindow = new BrowserWindow(windowobj)
    windowId = mainWindow.id;
    mainWindow.loadFile(path.join(__dirname, modelpath));
}