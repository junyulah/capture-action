# capture-action

[中文文档](./README_zh.md)   [document](./README.md)

capture user action in browser
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i capture-action --save` 或者 `npm i capture-action --save-dev`

全局安装, 使用 `npm i capture-action -g`



## 使用方法








### API 快速运行



```js
let capturer = require('capture-action')
let capture = capturer({
 eventListType: ['click', 'keydown'],
 onlyUserAction: false // set true will ignore none-user action
});

let {start, stop} = capture((action, event) => {
    // handle action and event here!
});

start(); // start to capture user action

stop(); // stop to capture user action

start(); // resume
```




## 开发

### 文件结构

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──debug    
│   │──test0    
│   │   │──assets    
│   │   │   └──app.js    
│   │   │──index.html    
│   │   │──index.js    
│   │   └──webpack.config.js    
│   └──testInputNumber    
│       │──assets    
│       │   └──app.js    
│       │──index.html    
│       │──index.js    
│       └──webpack.config.js    
│──index.js    
│──package.json    
│──src    
│   │──captureEvent.js    
│   │──index.js    
│   └──nodeUnique.js    
└──test    
    │──browser    
    │   │──base.js    
    │   │──fixture    
    │   │──resume.js    
    │   └──stop.js    
    └──function    
        └──index.js     
```


### 运行测试用例

`npm test`

## 许可证

The MIT License (MIT)

Copyright (c) 2016 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
