extern crate serde_json;

use serde_json::{Value};
use std::fs::File;

pub fn test() {
  let zh = get_json_lang("zh_CN");
  let en = get_json_lang("en_US");
  println!("{:#?}", zh);
  println!("{:#?}", en);
  println!("{:?}", zh["show"].as_str().unwrap());
  println!("{:?}", en["show"].as_str().unwrap());
}

pub fn get_lang(lang_str: &str) -> Value {
  get_json_lang(lang_str)
}

fn get_json_lang(lang_str: &str) -> Value {
  let prefix = String::from("json/");
  let suffix = String::from(".json");
  let path = format!("{}{}{}", prefix, lang_str, suffix);
  // let path = "json/".to_owned() + lang_str + ".json";
  let f = File::open(path).unwrap();
  serde_json::from_reader(f).unwrap()
}

