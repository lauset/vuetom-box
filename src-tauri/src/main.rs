#![cfg_attr(
    all(not(debug_assertions), target_os = "macos"),
    windows_subsystem = "macos"
)]

mod events;
mod menu;
mod winv;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        // .setup(winv::init)
        .menu(menu::init(&context))
        .on_menu_event(menu::handler)
        .system_tray(menu::tray_init(&context))
        .on_system_tray_event(menu::tray_handler)
        .invoke_handler(tauri::generate_handler![
            events::system::cmd1,
            events::system::cmd2
        ])
        .run(context)
        .expect("error while running tauri application");
}
