# Tauri - Vuetom Box

Rust + Vite + Vue3 + Ts + Tailwind

## Project

tauri:

- src:
  - main.rs
  - menu.rs
  - winv.rs
  - events
    - mod.rs
    - system.rs

### Theme

tailwind: `dark: 'media'`

```scss
button {
  @apply hover:bg-opacity-50 active:bg-opacity-100 ...;
  // light
  @apply bg-green-400 bg-opacity-30;
  // dark
  @apply dark:bg-blue-400 dark:bg-opacity-30;
}
```

scss var

```scss
// light
:root {
  --vt-c-bg: #fff;
}
// dark
@media (prefers-color-scheme: dark) {
  :root {
    --vt-c-bg: #000;
  }
}
// use
.root {
  background-color: var(--vt-c-bg);
}
```

### Languages

rust: src/menu.rs

js: src/i18n

## Commands

**scripts**

```sh
# Install Deps
pnpm i

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

## Useful

[Tauri](https://tauri.app/v1/guides/getting-started/setup)

[script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
