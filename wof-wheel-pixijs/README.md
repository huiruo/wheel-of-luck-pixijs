## 运行：
```bash
如果你不想降级 Node.js，可以设置 环境变量 使 Webpack 兼容 OpenSSL 3.0：

Linux/macOS 终端运行:

export NODE_OPTIONS=--openssl-legacy-provider

yarn dev


你遇到的 error:0308010C:digital envelope routines::unsupported 是由于 Node.js 17+ 默认使用 OpenSSL 3.0，导致 Webpack 及某些加密相关的模块无法正常运行。

解决方案 1（推荐）：使用 Node.js 16 LTS
你可以尝试 降级到 Node.js 16 解决这个问题，运行以下命令（如果你安装了 nvm）：

nvm install 16
nvm use 16
```




# Amazing Wheel Of Fortune 🎰
[(Wheel Of Fortune 🎰) on Github Pages](https://tvetcov.github.io/wof/)  

Wheel of Fortune game. Rules are simple, you place a bet, if your bet equals to number on the wheel, your score increases, otherwise you loose this amount of points. Game developed with **[Pixi.JS](https://www.pixijs.com/)**.

#### Main screen looks like:
![Game screenshot](https://iili.io/dzGt5b.png "Game screenshot")

## Running the project

To run the game locally you need to:   
1. Copy/download this repository.
2. Have [Npm](https://www.npmjs.com/) / [Yarn](https://yarnpkg.com/) and [NodeJs](https://nodejs.org/en/) installed.
3. Run ``npm run build`` if you are more into npm or ``yarn build`` otherwise.
4. Run ``npm start`` or ``yarn start``.
5. Enjoy the game.

## Compatibility
Tested on multiple platforms and browsers including: 
- Windows 10 ( Google Chrome, Mozilla Firefox, Edge, IE )
- Windows 7 ( Google Chrome, IE )
- MacOS Catalina ( Google Chrome, Safari )
- Ubuntu 20.04 ( Google Chrome, Mozilla Firefox, Opera )
