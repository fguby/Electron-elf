# Desktop Elf ![avatar](app/img/xiaojingling.png)

![Travis](https://img.shields.io/badge/Electron-^4.1.4-important.svg)
<a href="https://github.com/fguby/Elf/releases"><img src="https://img.shields.io/github/release/fguby/Elf.svg?style=flat-square" alt="Current Release"></a>
[![](https://travis-ci.org/fguby/Electron-elf.svg?branch=master)](https://travis-ci.org/fguby/Electron-elf)
![Travis](https://img.shields.io/badge/live2D-2.1.0-ff69b4.svg?labelColor=blueviolet)
[![Gitter](https://badges.gitter.im/Electron-elf/community.svg)](https://gitter.im/Electron-elf/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[English Document](https://github.com/fguby/Elf/blob/master/README-en.md "elf")

![avatar](app/img/yanshi1.gif)

> A secondary desktop application developed using Electron and live2D.

### φ(≧ω≦*)♪

If you like, please give me a ⭐️✨

---

### Related technology

一 [Electron](https://electronjs.org/ "electron")

一 [live2D](https://www.live2d.com/ja/ "live2D")

一 [live2D Web Add-on](https://github.com/fguby/live2D "live2D")

### Quick start

1. Download the sample code

```
git clone https://github.com/fguby/Electron-elf.git
```

2.进入目录

```
cd Electron-elf
```

3. Install dependencies and run

```
Npm install && npm start
```

### Support function

- [x] model switching
- [x] Built-in sound
- [x] window drag and drop
- [x] Dressup function
- [x] Custom menu title text
- [x] Some interesting little features
- [x] mac notification bar development (easy way to delete mail?)
- [x] Support for setting up a local model repository
- [x] Collection and notification of text messages
- [x] Attachment mail automatically downloads attachments to local
- [x] Shortcuts to switch models and dress up
- [x] Drag file to model area to trigger delete function

#### A rough system settings interface?

![avatar](app/img/system.jpg)

#### Shortcuts are randomly changed

![avatar](app/img/huanzhuang.gif)

#### Mail collection and mac notification bar notification

![avatar](app/img/email.gif)

#### Reply to RM command to delete mail

![avatar](app/img/email111.gif)

#### Drag files to the model area to delete files

![avatar](app/img/lajitong1.gif)

#### Replace the menu title with ip

![avatar](app/img/ip.gif)

---

### Set up local model repository steps

- 1️⃣Set the model repository (Select the folder to be uploaded, and change the json file of the model to the name model.json to ensure that the system can read it.)

- 2️⃣ Click '系统设置' to configure the menu bar text for the new model.

- 3️⃣ Restart the application.

---

### Some interesting little features showcase (will be done)

#### Format the json string (try using the shortcut key command + T)

![avatar](app/img/json.gif)

The script comes from 一 [JsonUtils](https://github.com/cnfn/BitBarPlugins/tree/master/JsonUtils "jsonutil")

Environmental dependence: jq

Can be installed using the following command

```
brew install jq
```

or,

[Go and see the official example?](https://stedolan.github.io/jq/download/ "jq")

---

### TODO

- [x] Mailbox monitoring
- [x] Dressup function
- [x] mac notification bar development
- [x] Upload a custom model
- [ ] Development of some interesting little features (show ip, weather, etc.)
- [ ] Shortcut Custom Settings
- [x] Trash function
- [ ] Customize the storage location of email attachments
- [x] mac notification bar to add a reply line, you can delete the mail directly
- [ ] Custom configuration page for each module (initial startup model settings, clothes settings...)
- [ ] ......

> If you like, please give a star, it is best to keep watching this project.

一 [Here is the latest beta version of the dmg file:alien:](https://github.com/fguby/Elf/releases/tag/v1.0.1/ "Elf")

---

### Shortcut description

Features | hot key
--- | ---
Switching model | command + Y
Dressup function | command + J
Format json string | command + T

~~Only two shortcut keys are supported at the moment, please follow up later. ~~

Added a third shortcut (please note that the use of this feature requires some extra stuff, please go up.)

---

### Comments and bug feedback

一 [issues:speech_balloon:](https://github.com/fguby/Elf/issues "welcome")

my personal email (fguby1995@gmail.com)

### ~~Would you like to have a cup of coffee with me?~~

<img src="app/img/wechat.jpg" width="250" height="310">
<img src="app/img/zhifubao.jpg" width="250" height="310">
