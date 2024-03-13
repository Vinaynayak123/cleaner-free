import React, { useState, useEffect ,useContext} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import StartScan from "./StartScan";
import { StudentContext } from "../context/StudentState";

function Status() {
  const [cleanerStart, setCleanerStart] = useState("status");
  let ContextValue = useContext(StudentContext);
  const [systemInfo, setSystemInfo] = useState(null);
  console.log("System info :", systemInfo);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const response = await invoke("get_system_info");
        setSystemInfo(response);
      } catch (error) {
        console.error("Error fetching system info:", error.message);
        setError(error.message);
      }
    };

    fetchSystemInfo();
  }, []);

  if (error) {
    return <div>Error fetching system info: {error}</div>;
  }

  if (!systemInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="scan-container">
        <div className="scan-status">
          <div className="system-info-main">
            <div className="systeminfosecond">
              <h1>System Information</h1>
              <p><span style={{fontWeight:"600"}}>Product ID</span> : {systemInfo.product_id}</p>
              <p><span style={{fontWeight:"600"}}>System Type</span> : {systemInfo.memory_info}</p>
              <p><span style={{fontWeight:"600"}}>Model</span> : {systemInfo.model}</p>
              <p><span style={{fontWeight:"600"}}>OS</span> : {systemInfo.os_info}</p>
              <p><span style={{fontWeight:"600"}}>CPU </span> : {systemInfo.cpu_info}</p>
              <p><span style={{fontWeight:"600"}}>Disk</span> : {systemInfo.disk_info}</p>
            </div>
          </div>
        </div>
        <div className="start-container">
          <h4 className="status-h4">
            Deep Scan clean, and optimize your registry to help boost the
            performance of your PC !
          </h4>
          <button
            class="button-scan"
            role="button"
            onClick={(e) => {
              ContextValue.updateCleanerStatus("start-registry");
            }}
          >
            Start Registry Scan
          </button>
        </div>
      </div>

      <div className="scan-container">
        <div className="scan-status">
          
          <div className="enquiryform">
            For any technical assistance or inquiries, please contact our
            support team at{" "}
            <span style={{ color: "#1152ed" }}>
              {" "}
               (844) 799-0080{" "}
            </span>
            <br />
            If you encounter any issues during activation or have questions,
            feel free to reach out to us.
          </div>
        </div>

        <div className="start-container">
          <h3 className="status-h4">
            <div>
              <span>
                <i className="fa-solid fa-phone-volume fa-shake iconColor"></i>
              </span>
              Toll free Number  (844) 799-0080
            </div>
          </h3>
          {/* <button
            class="button-scan"
            role="button"
            onClick={(e) => setCleanerStart("start-registry")}
          >
            Start Registry Scan
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Status;
