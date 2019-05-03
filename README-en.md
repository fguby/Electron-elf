# Desktop Elf ![avatar](app/img/xiaojingling.png)

![Travis](https://img.shields.io/badge/Electron-4.1.4-important.svg)
<a href="https://github.com/fguby/Elf/releases"><img src="https://img.shields.io/github/release/fguby/Elf.svg?style=flat-square" alt="Current Release"></a>
[![](https://travis-ci.com/fguby/Elf.svg?branch=master)](https://travis-ci.org/fguby/Elf)
![Travis](https://img.shields.io/badge/live2D-2.1.0-ff69b4.svg?labelColor=blueviolet)

[English Document](https://github.com/fguby/Elf/blob/master/README-en.md "elf")

![avatar](app/img/yanshi1.gif)

> A secondary desktop application developed using Electron and live2D.

---

### Related technology

一 [Electron](https://electronjs.org/ "electron")

一 [live2D](https://www.live2d.com/ja/ "live2D")

一 [live2D Web](https://github.com/fguby/live2D "live2D")

### Quick start

1. Download the sample code

```
git clone https://github.com/fguby/Elf.git
```

2. Enter the directory

```
cd Elf
```

3. Install dependencies and run

```
npm install && npm start
```

### Support function

- [x] model switching
- [x] Built-in sound
- [x] window drag and drop
- [x] Message box (temporarily deleted)
- [x] Dressup function
- [x] mac notification bar development (easy way to delete mail?)
- [x] Local upload custom model
- [x] text mail collection and notification
- [x] Attachment mail automatically downloads attachments to local
- [x] Shortcuts to switch models and dress up
- [x] Drag file to model area to trigger delete function

#### A rough system settings interface?

![avatar](app/img/system.jpg)

#### Shortcut change clothing

![avatar](app/img/loli.gif)

#### Mail collection and mac notification bar notification

![avatar](app/img/email.gif)

#### Reply to RM command to delete mail

![avatar](app/img/email111.gif)

#### Drag files to the model area to delete files

![avatar](app/img/lajitong1.gif)

---

### Upload custom model steps

- (1) Click on the menu bar -> "导入模型文件" (Select the folder to be uploaded, and change the json file of the model to the name model.json to ensure that the system can read it.)

![avatar](app/img/shangchuan1.jpg)

- (2) Click 'System Settings' to configure the menu bar text for the new model.

![avatar](app/img/shangchuan2.jpg)

- (3) Restart the application.

### TODO

- [x] Mailbox monitoring
- [x] Dressup function
- [x] mac notification bar development
- [x] Upload a custom model
- [ ] Message module perfect
- [ ] Shortcut Custom Settings
- [x] Trash function
- [ ] Customize the storage location of email attachments
- [ ] mac notification bar to add a reply line, you can directly reply or delete the message
- [ ] Custom configuration page for each module (initial startup model settings, clothes settings...)
- [ ] ......

> If you like, please give me a star, it is best to keep watching this project.

一 [Here is the latest beta dmg file:alien:](https://github.com/fguby/Elf/releases/tag/v0.1.1/ "Elf")

---

Features | hot key
--- | ---
Switching model | command + Y
change clothes | command + J

For the time being, only two shortcut keys are supported. Please follow up later.

### Comments and bug feedback

一 [issues:speech_balloon:](https://github.com/fguby/Elf/issues "welcome")
