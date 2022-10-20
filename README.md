# mouse-freeze-bug

This repository demonstrates a bug with Chromium.

## Steps to reproduce (Electron)

1. Clone the repository:

```sh
$ git clone https://github.com/v5p/mouse-freeze-bug.git
> Cloning into mouse-freeze-bug...
$ cd mouse-freeze-bug
```

2. Install dependencies

```sh
$ npm install
```

3. Test unlimited FPS

This will start Electron with the `disable-frame-rate-limit` switch and navigate to the local webserver.

```sh
$ npm run electron-unlocked
```

To verify this bug is present:

- Drag your mouse anywhere across the window
- WebSocket and Worker messaging should spike in latency (time it took for the main renderer thread to receive the message)

3. Test limited FPS

This will start Electron with no additional switches and navigate to the local webserver.

```sh
$ npm run electron
```

To verify this bug is no longer as intense:

- Drag your mouse anywhere across the window
- WebSocket and Worker messaging should only slightly increase in latency

## Steps to reproduce (Your browser)

1. Clone the repository:

```sh
$ git clone https://github.com/v5p/mouse-freeze-bug.git
> Cloning into mouse-freeze-bug...
$ cd mouse-freeze-bug
```

2. Install dependencies

```sh
$ npm install
```

3. Start the HTTP/WebSocket server

```sh
$ npm start
```

4. Test unlimited FPS

Start Chromium the `disable-frame-rate-limit` switch and navigate to http://localhost:8080/.

```sh
$ chromium-browser --disable-frame-rate-limit http://localhost:8080/
```

To verify this bug is present:

- Drag your mouse anywhere across the window
- Both WebSocket and Worker messaging should spike in latency (time it took for the main renderer thread to receive the message)

4. Test limited FPS

Start Chromium with no switches and navigate to http://localhost:8080/.

```sh
$ chromium-browser http://localhost:8080/
```

To verify this bug is no longer as intense:

- Drag your mouse anywhere across the window
- Both WebSocket and Worker messaging should only slightly increase in latency

## Overview

- not present in <= Electron V9 or <= Chromium 83.0.4103.122 (`npm install electron@9`)
- forced the [Krunker](https://krunker.io/) developers to lock the Electron dependency to version 9
- earliest Chrome version where this occurs is currently unknown
