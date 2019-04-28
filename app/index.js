// Modules to control application life and create native browser window
const electron = require('electron')
const {ipcMain,app, Menu,Tray, BrowserWindow,shell,globalShortcut,Notification} = require('electron')
const path = require('path');
var Imap = require('imap');
var MailParser = require("mailparser").MailParser;
var fs = require("fs");
var appTray;
let mainWindow;
let notif;
//菜单栏图标的位置
var iconX = 0;
var iconY = 0;

//窗口id值
var windowId;
//系统设置window
var systemWindowId;
//窗口对象
var windowobj;
//切换衣服模式
var changeTexureWay = "sequence";
var modelMenuId = 0;
var modelMenuArr = ["/index.html","/view/pio.html","/view/sisters.html","/view/rem.html","/view/katou.html"];

//邮件obj
var emails = [];
var emailObj = {
    "from"    : "",
    "type"    : "",
    "text"    : "",
    "html"    : "",
    "filename" : "",
    "subject" : ""
};

//设置一个系统的全局变量
var systemObj = {
    "email": "",
    "password": "",
    "pop": "",
    "model": "",
    "texure": "",
    "change_texure_way": ""
};

function connectEmail() {
  //连接邮箱前先清空邮件数组
  emails = [];
  imap.connect();
}

function setEmailInterval(){
  if(imap != null) setInterval(connectEmail,10000);
}

//从dbjson里加载数据的function
function setSystemObj(callbackFunction) {
    //启动，初始化email
    var dbPath = path.join(__dirname, '/db/db.json')
    const low = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync(dbPath);
    const db = low(adapter);
    systemObj['email'] = db.get("email").value();
    systemObj['password'] = db.get("password").value();
    systemObj['pop'] = db.get("pop").value();
    systemObj['model'] = db.get("model").value();
    return callbackFunction();
}
function initSystemSetUp() {
  imap = new Imap({
      email : systemObj.email,
      password : systemObj.password,
      host : systemObj.pop
  });
  //开启email定时执行
  setEmailInterval();
  //监听
  imapReady();
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
    const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
    windowobj = {
      x:width - 300,
      y:height - 500,
      width: 300,
      height: 500,
      // width: 800,
      // height: 1000,
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
        nodeIntegration: true
      }
    }
      // Create the browser window.
    mainWindow = new BrowserWindow(windowobj);
     // 打开开发者工具
    //mainWindow.webContents.openDevTools()
    windowId = mainWindow.id;
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '/index.html'))

    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })

    //快捷键注册 模型切换
    globalShortcut.register('CommandOrControl+Y', () => {
       notif.show();
       if(modelMenuId == 4) {
         modelMenuId = 0;
       }else{
         modelMenuId += 1;
       }
       changeModel(modelMenuArr[modelMenuId]);
    });
    //快捷键注册 换装
    globalShortcut.register('CommandOrControl+J', () => {
      var window = BrowserWindow.fromId(windowId);
      //发送换装消息
      window.webContents.send('asynchronous-reply', changeTexureWay)
   });

   //系统托盘右键菜单
   var trayMenuTemplate = [
      {
          id:1,
          label: '更换模型',
          type: 'submenu',
          // icon: path.join(__dirname, '/img/Fairy44 - Face #2220.png'),
          submenu: [
              {
                label:'干物妹小埋',
                type:'radio',
                checked:true,
                click:function() {
                  changeModel('/index.html');
                  modelMenuId = 0;
               }
              },
              {
                label:'药水制作师小萝莉',
                type:'radio',
                click:function() {
                  changeModel('/view/pio.html');
                  modelMenuId = 1;
               }
              },
              {
                label:'二次元姐妹花',
                type:'radio',
                click:function() {
                  changeModel('/view/sisters.html');
                  modelMenuId = 2;
               }
              },
              {
                label:'从零开始的异世界生活：蕾姆',
                type:'radio',
                click:function() {
                  changeModel('/view/rem.html');
                  modelMenuId = 3;
               }
              },
              {
                label:'路人女主养成方法：加藤惠',
                type:'radio',
                click:function() {
                  changeModel('/view/katou.html');
                  modelMenuId = 4;
               }
              },
          ]
      },
      {
        type:'separator'
      },
      {
          id:2,
          label: '💰赞助一下',
          click:function(menuItem, browserWindow, event){
              wechatpay(appTray.getBounds(),browserWindow)
          }
      },
      {
        id:3,
        label: '👗换装',
        click:function(){
          var window = BrowserWindow.fromId(windowId);
          //发送换装消息
          window.webContents.send('asynchronous-reply', changeTexureWay)
        }
      },
      {
        id:4,
        label: 'website',
        click:function() {
          //shell打开页面
           shell.openExternal('https://github.com/fguby');
        }
      },
      {
        id:4,
        label: '系统设置',
        click:function() {
              //let displays = electron.screen.getCursorScreenPoint()
            let systemWindow = new BrowserWindow({
              width:600,
              height:450,
              title:'',
              webPreferences: {
                nodeIntegration: true
              }
            });
            systemWindow.loadFile(path.join(__dirname, '/system.html'));
            //打开开发者工具
            // systemWindow.webContents.openDevTools();
            systemWindowId = systemWindow.id;
        }
      },
      {
        type:'separator'
      },
      {
        id:5,
        label: '换装设置',
        submenu:[
            {
              label:'顺序切换',
              type:'radio',
              checked:true,
              click:function(){
                changeTexureWay = "sequence";
              }
            },
            {
              label:'随机切换',
              type:'radio',
              click:function(){
                changeTexureWay = "random";
              }
            },
        ]
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
  //开启邮箱提醒
  setSystemObj(initSystemSetUp);
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


//监听渲染器进程发送过来的消息
ipcMain.on('system-set-up', (event, arg) => {
  console.log(arg) // prints "ping"
  imap.end();
  //根据用户填写信息设置
  imap = new Imap({
    user : arg.email,
    password : arg.password,
    host : arg.pop
  });
  var window = BrowserWindow.fromId(systemWindowId);
  window.close();
  //开启email定时执行
  setEmailInterval();
  //监听
  imapReady();
  //event.sender.send('asynchronous-reply', 'pong')
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//打开微信支付界面
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

//初始化imap
var imap = null;

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

function imapReady() {
  if(imap != null) {
    imap.on('ready', function() {
      openInbox(function(err, box) {
        // console.log("打开邮箱")
        if (err) throw err;
        imap.search(['UNSEEN', ['SINCE', 'May 20, 2017']], function(err, results) {//搜寻2017-05-20以后未读的邮件
          if (err) throw err;
          if(results.length == 0) {
              imap.end();
              return;
          }
          var f = imap.fetch(results, { bodies: '' });//抓取邮件（默认情况下邮件服务器的邮件是未读状态）
          //没有邮件,退出
          if(f == undefined){
            imap.end();
            return;
          }
          f.on('message', function(msg, seqno) {
            var mailparser = new MailParser();
            msg.on('body', function(stream, info) {
              stream.pipe(mailparser);//将为解析的数据流pipe到mailparser
              //邮件头内容
              mailparser.on("headers", function(headers) {
                  // console.log("邮件主题: " + headers.get('subject'));
                  // console.log("发件人: " + headers.get('from').text);
                  // // console.log("收件人: " + headers.get('to').text);
                  emailObj['subject'] = headers.get('subject');
                  emailObj['from'] = headers.get('from').text;
              });
              //邮件内容
              mailparser.on("data", function(data) {
                if (data.type === 'text') {//邮件正文
                  emailObj['type'] = "text";
                  emailObj['text'] = data.text;
                  emailObj['html'] = data.html;
                }
                if (data.type === 'attachment') {//附件
                  emailObj['type'] = "attachment";
                  emailObj['filename'] = data.filename;
                  emailObj['text'] = data.filename + "已为您保存到本地。";
                  data.content.pipe(fs.createWriteStream(data.filename));//保存附件到当前目录下
                  data.release();
                }
              });
            });
            msg.on('end', function() {
              // console.log(seqno + '完成');
              emails.push(emailObj);
              //添加已阅读标志
              imap.addFlags(results,"SEEN");
            });
          });
          f.on('error', function(err) {
            console.log('抓取出现错误: ' + err);
          });
          f.on('end', function() {
            // console.log('所有邮件抓取完成!');
            imap.end();
          });
        });
      });
    });

    imap.on('error', function(err) {
      console.log(err);
    });

    imap.on('end', function() {
      // console.log('关闭邮箱');
      //未读邮件数大于0,调用通知。
      if(emails.length > 0) {
          var msg = emails.length > 1 ? "邮箱里总共有" + (emails.length) + "封未读邮件" : "";
          //调用通知
          notif = new Notification({
            title : emails[0].subject,
            subtitle : msg,
            body : emails[0].text
            // icon : path.join(trayIcon, './img/tomato.png')
          });
          notif.show();
          notif.once('click',function(event){
            if(emails[0].filename == '') {
                //用户点击了邮件
                let emailWindow = new BrowserWindow({
                  x: appTray.getBounds().x - 100,
                  y: appTray.getBounds().y,
                  width:400,
                  height:300,
                  darkTheme:true,
                  titleBarStyle:"hidden",
                  webPreferences: {
                    nodeIntegration: true
                  }
                });
                global.sharedObject = {
                  someProperty: emailObj
                };
                emailWindow.loadFile(path.join(__dirname, '/view/email.html'));
            }else{
                shell.showItemInFolder("./" + emails[0].filename);
            }
        });
      }
    });
  }
}

// setEmailInterval();

