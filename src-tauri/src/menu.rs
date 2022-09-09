use tauri::api::dialog::message;
use tauri::utils::assets::EmbeddedAssets;
use tauri::{
    AboutMetadata, AppHandle, Context, CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent,
};

// 应用菜单项
pub fn init(context: &Context<EmbeddedAssets>) -> Menu {
    // 应用名称
    let name = &context.package_info().name;
    // tauri::Menu::os_default(name);
    // 应用主菜单
    let app_menu = Submenu::new(
        "",
        // MenuItem::About 为原生菜单
        Menu::new().add_native_item(MenuItem::About(name.into(), AboutMetadata::new())),
    );

    // 编辑菜单（重写默认Edit菜单）
    // let edit_menu = Submenu::new(
    //     "Edit",
    //     Menu::new()
    //         .add_item(CustomMenuItem::new("undo".to_string(), "Undo"))
    //         .add_item(CustomMenuItem::new("redo".to_string(), "Redo")),
    // );

    /*
     * 帮助菜单
     * - 关于
     * -
     */
    let help_menu = Submenu::new(
        "Help",
        Menu::new()
            .add_item(CustomMenuItem::new("menu_help_print".to_string(), "Print"))
            .add_item(CustomMenuItem::new("menu_help_git".to_string(), "Git")),
    );

    // Menu::new()
    //     .add_submenu(app_menu)
    //     .add_submenu(test_menu)
    //     .add_submenu(help_menu)

    Menu::os_default(name)
        .add_submenu(help_menu)

}

// 应用菜单处理事件
pub fn handler(event: WindowMenuEvent) {
    // 菜单所属的窗口
    let win = Some(event.window());
    // 匹配菜单 id
    match event.menu_item_id() {
        "menu_help_git" => {
            // 发送信息到菜单所属窗口（弹窗形式）
            message(win, "Eidt File", "TODO");
        }
        "menu_help_print" => {
            // debug 信息（终端输出）
            dbg!("more help");
        }
        _ => {}
    }
}
