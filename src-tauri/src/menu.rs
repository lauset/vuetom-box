use tauri::api::dialog::message;
use tauri::utils::assets::EmbeddedAssets;
use tauri::Manager;
use tauri::{
    AboutMetadata, AppHandle, Context, CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent,
};
use tauri::{SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu};

#[derive(Clone, serde::Serialize)]
struct Payload {
    lang: String,
}

// 应用菜单项
pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    // 应用名称
    let name = &context.package_info().name;
    // tauri::Menu::os_default(name)
    // 应用主菜单
    let app_menu = Submenu::new(
        "",
        // MenuItem::About 为原生菜单
        Menu::new().add_native_item(MenuItem::About(name.into(), AboutMetadata::new())),
    );
    // 文件菜单（自定义菜单）
    let file_menu = Submenu::new(
        "File",
        Menu::new()
            .add_item(CustomMenuItem::new("new_file".to_string(), "New File"))
            .add_item(CustomMenuItem::new("edit_file".to_string(), "Edit File")),
    );
    // 编辑菜单（自定义菜单）
    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_item(CustomMenuItem::new("undo".to_string(), "Undo"))
            .add_item(CustomMenuItem::new("redo".to_string(), "Redo")),
    );

    Menu::new()
        .add_submenu(app_menu)
        .add_submenu(file_menu)
        .add_submenu(edit_menu)
}

// 托盘菜单
pub fn tray_init(_context: &Context<EmbeddedAssets>) -> SystemTray {
    let quit = CustomMenuItem::new("tray_quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("tray_hide".to_string(), "Hide");
    let change_ico = CustomMenuItem::new("change_ico".to_string(), "Change Icon");
    let tray_menu = SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new(
            "Language", // 语言菜单
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("tray_lang_en".to_string(), "English"))
                .add_item(CustomMenuItem::new(
                    "tray_lang_zh_CN".to_string(),
                    "简体中文",
                ))
                .add_item(CustomMenuItem::new(
                    "tray_lang_zh_HK".to_string(),
                    "繁体中文",
                )),
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_submenu(SystemTraySubmenu::new(
            "Settings",
            SystemTrayMenu::new().add_item(CustomMenuItem::new("tray_about".to_string(), "About")),
        ))
        .add_item(change_ico)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

pub fn tray_handler(app: &AppHandle, event: SystemTrayEvent) {
    // 获取应用窗口
    let window = app.get_window("main").unwrap();
    let _parent_window = Some(&window);
    // 匹配点击事件
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a left click");
            //   app.tray_handle()
            //         .set_icon(tauri::Icon::Raw(
            //             include_bytes!("../icons/StoreLogo.png").to_vec(),
            //         ))
            //         .unwrap();
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
            let item_handle = app.tray_handle().get_item(&id);
            match id.as_str() {
                "change_ico" => {
                    // 更新托盘图标
                    app.tray_handle()
                        .set_icon(tauri::Icon::Raw(
                            include_bytes!("../icons/icon.png").to_vec(),
                        ))
                        .unwrap();
                }
                lang if lang.contains("tray_lang_") => {
                    // 选择语言，匹配 id 前缀包含 `lang_` 的事件
                    Lang::new(
                        app,
                        id,
                        vec![
                            Lang {
                                name: "English",
                                id: "tray_lang_en",
                            },
                            Lang {
                                name: "繁体中文",
                                id: "tray_lang_zh_HK",
                            },
                            Lang {
                                name: "简体中文",
                                id: "tray_lang_zh_CN",
                            },
                        ],
                    );
                }
                "tray_about" => {
                    println!("about vuetom box");
                }
                "tray_quit" => {
                    std::process::exit(0);
                }
                "tray_hide" => {
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                        item_handle.set_title("Show").unwrap();
                    } else {
                        window.show().unwrap();
                        item_handle.set_title("Hide").unwrap();
                    }
                }
                _ => {}
            }
        }
        _ => {}
    }
}

struct Lang<'a> {
    name: &'a str,
    id: &'a str,
}

impl Lang<'static> {
    fn new(app: &AppHandle, id: String, langs: Vec<Lang>) {
        // 获取点击的菜单项的句柄
        // 注意 `tray_handle` 可以在任何地方调用，只需在 setup 钩子上使用 `app.handle()` 获取 `AppHandle` 实例，将其移动到另一个函数或线程
        langs.iter().for_each(|lang| {
            let handle = app.tray_handle().get_item(lang.id);
            if lang.id.to_string() == id.as_str() {
                // 设置菜单名称
                handle.set_title(format!("💬 {}", lang.name)).unwrap();
                // 还可以使用 `set_selected`、`set_enabled` 和 `set_native_image`（仅限 macOS）
                handle.set_selected(true).unwrap();
                // emit to fronted
                println!("{}", lang.id);
                app.emit_all(
                    "e-change-lang",
                    Payload {
                        lang: lang.id.to_string().replace("tray_lang_", ""),
                    },
                )
                .unwrap();
            } else {
                handle.set_title(lang.name).unwrap();
                handle.set_selected(false).unwrap();
            }
        });
    }
}

// 应用菜单处理事件
pub fn handler(event: WindowMenuEvent) {
    // 菜单所属的窗口
    let win = Some(event.window());
    // 匹配菜单 id
    match event.menu_item_id() {
        "new_file" => {
            // debug 信息（终端输出）
            dbg!("new file");
        }
        "edit_file" => {
            // 发送信息到菜单所属窗口（弹窗形式）
            message(win, "Eidt File", "TODO");
        }
        "undo" => {
            dbg!("undo");
        }
        "redo" => {
            dbg!("redo");
        }
        _ => {}
    }
}
