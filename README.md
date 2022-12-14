# Tauri - Vuetom Box

Rust + Vue3 + Vite + Ts + Tailwind

## Project

tauri:

- src:
  - main.rs
  - lang.rs
  - menu.rs
  - tray.rs
  - winv.rs
  - events
    - mod.rs
    - system.rs

### Languages

en, zh, zhHK

### Themes

three themes (normal, naruto, wind)

### Dark Mode

tailwind: `dark: 'class'`

```scss
button {
  @apply hover:bg-opacity-50 active:bg-opacity-100 ...;
  // light
  @apply bg-green-400 bg-opacity-30;
  // dark
  @apply dark:bg-blue-800 dark:bg-opacity-60;
}
```

scss var

```scss
// light
:root {
  --vt-c-bg: #fff;
}
// dark
.dark {
  --vt-c-bg: #000;
}
// use
.root {
  background-color: var(--vt-c-bg);
}
// Deprecated media
// @media (prefers-color-scheme: dark) {
//   :root { }
// }
```

## Commands

**npm scripts**

```sh
# Install Deps
pnpm install

# Browse in browser
pnpm dev

# Browse in OS
pnpm tauri:dev

# Build App
pnpm tauri:build
```

**rust cargo**

```sh
cd src-tauri/

cargo add lib

cargo fmt
```

## Rust

waiting...

## Features

- [x] Responsive Menu
- [x] DarkMode & Theme
- [x] Languages switching
- [x] Simple Events
- [ ] Built in Server
- [ ] Dialogs
- [ ] Dynamic effect

## First edition Preview

![view1](./resource/view1.png)

![view2](./resource/view2.png)

![view3](./resource/view3.png)

![tray1](./resource/tray1.png)

![tray2](./resource/tray2.png)

## Useful

[Tauri](https://tauri.app/v1/guides/getting-started/setup)

[script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
