use crate::lang::get_lang;
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

struct Lang<'a> {
    name: &'a str,
    icon: &'a str,
    id: &'a str,
}

struct TrayMenus<'a> {
    id: &'a str,
    label: &'a str,
}

// 托盘菜单
pub fn init(_context: &Context<EmbeddedAssets>) -> SystemTray {
    let quit = CustomMenuItem::new("tray_quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("tray_hide".to_string(), "Hide");
    let change_ico = CustomMenuItem::new("change_ico".to_string(), "Change Icon");
    let tray_menu = SystemTrayMenu::new()
        .add_submenu(SystemTraySubmenu::new(
            "Languages", // 语言菜单
            SystemTrayMenu::new()
                .add_item(CustomMenuItem::new("tray_lang_en".to_string(), "English "))
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

pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
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
                                name: "English ",
                                icon: "🇬🇧",
                                id: "tray_lang_en",
                            },
                            Lang {
                                name: "繁体中文",
                                icon: "🇭🇰",
                                id: "tray_lang_zh_HK",
                            },
                            Lang {
                                name: "简体中文",
                                icon: "🇨🇳",
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

impl Lang<'static> {
    fn new(app: &AppHandle, id: String, langs: Vec<Lang>) {
        // 获取点击的菜单项的句柄
        // 注意 `tray_handle` 可以在任何地方调用，只需在 setup 钩子上使用 `app.handle()` 获取 `AppHandle` 实例，将其移动到另一个函数或线程
        langs.iter().for_each(|lang| {
            let handle = app.tray_handle().get_item(lang.id);
            if lang.id.to_string() == id.as_str() {
                // 设置菜单名称
                handle
                    .set_title(format!("{} {}", lang.name, lang.icon))
                    .unwrap();
                // 还可以使用 `set_selected`、`set_enabled` 和 `set_native_image`（仅限 macOS）
                handle.set_selected(true).unwrap();
                // emit to fronted
                let lang_param = lang.id.to_string().replace("tray_lang_", "");
                // set_tray_lang(app, &lang_param);
                app.emit_all("e-change-lang", Payload { lang: lang_param })
                    .unwrap();
            } else {
                handle.set_title(lang.name).unwrap();
                handle.set_selected(false).unwrap();
            }
        });
    }
}

fn set_tray_lang(app: &AppHandle, lang_param: &String) {
    let l = get_lang(lang_param);
    let tray_menus = vec![
        TrayMenus {
            id: "tray_hide",
            label: "Show/Hide",
        },
        TrayMenus {
            id: "tray_quit",
            label: "Quit",
        },
        TrayMenus {
            id: "change_ico",
            label: "Change Icon",
        },
    ];
    tray_menus.iter().for_each(|menu| {
        let label = l[menu.id].to_string();
        let label_trim = label.trim_matches('"');
        let handle = app.tray_handle().get_item(menu.id);
        handle.set_title(label_trim).unwrap();
    });
}
