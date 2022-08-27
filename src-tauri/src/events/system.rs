#[tauri::command]
pub fn cmd1(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn cmd2(number: usize) -> Result<String, String> {
    if number == 1 {
        Err("This failed!".into())
    } else {
        Ok("This worked!".into())
    }
}
