use std::process::{Command, Stdio};
use serde::Serialize;

#[derive(Serialize)]
struct SystemInfo {
    product_id: String,
    memory_info: String,
    model: String,
    os_info: String,
    cpu_info: String,
    disk_info: String,
}

#[tauri::command]
fn get_system_info() -> Result<SystemInfo, String> {
    let os_info_output = Command::new("wmic")
        .args(&["os", "get", "Caption"])
        .stdout(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
    let os_info = String::from_utf8_lossy(&os_info_output.stdout).trim().to_string();
    println!("OS Info: {}", os_info);

    let cpu_info_output = Command::new("wmic")
        .args(&["cpu", "get", "name"])
        .stdout(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
    let cpu_info = String::from_utf8_lossy(&cpu_info_output.stdout).trim().to_string();
    println!("CPU Info: {}", cpu_info);

    let disk_info_output = Command::new("wmic")
        .args(&["diskdrive", "get", "size"])
        .stdout(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
    let disk_info = String::from_utf8_lossy(&disk_info_output.stdout).trim().to_string();
    println!("Disk Info: {}", disk_info);

    // Retrieve system model
    let model_output = Command::new("wmic")
        .args(&["computersystem", "get", "model"])
        .stdout(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
    let model = String::from_utf8_lossy(&model_output.stdout).trim().to_string();
    println!("Model : {}", model);

    // Retrieve RAM information
    let ram_output = Command::new("wmic")
        .args(&["memorychip", "get", "Capacity"])
        .stdout(Stdio::piped())
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;
    let ram_capacity: u64 = String::from_utf8_lossy(&ram_output.stdout)
        .trim()
        .lines()
        .skip(1) // Skip header line
        .filter_map(|line| line.trim().parse::<u64>().ok()) // Parse each line as u64
        .sum(); // Sum up all RAM capacities

    // Convert bytes to GB (divide by 1e9)
    let ram_info = format!("{:.2}GB", ram_capacity as f64 / 1e9);
    println!("RAM : {}", ram_info);


     // Retrieve product ID
     let product_id_output = Command::new("wmic")
     .args(&["bios", "get", "serialnumber"])
     .stdout(Stdio::piped())
     .output()
     .map_err(|e| format!("Failed to execute command: {}", e))?;
 let product_id = String::from_utf8_lossy(&product_id_output.stdout).trim().to_string();
 println!("product_id : {}", product_id);


  // Retrieve system type
  let system_type_output = Command::new("wmic")
  .args(&["computersystem", "get", "systemtype"])
  .stdout(Stdio::piped())
  .output()
  .map_err(|e| format!("Failed to execute command: {}", e))?;
let system_type = String::from_utf8_lossy(&system_type_output.stdout).trim().to_string();

println!("system_type : {}", system_type);


    

    Ok(SystemInfo {
        product_id,
        memory_info: system_type,
        model,
        os_info,
        cpu_info,
        disk_info,
        
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_system_info,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
