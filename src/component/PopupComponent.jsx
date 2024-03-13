import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import lock from "../Image/locker.png";
import key from "../Image/key.png";
import Swal from "sweetalert2";
import StartScan from "./StartScan"; 

export default function RegisterPopupComponent({ onClose }) {
  // const navigate = useNavigate();
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "42a725b0-28a7-4fa1-b2e7-b9bcc445bc93");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      onClose();
      window.location.href = "/";
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  const handleClose = () => {
    onClose();
    window.location.href = "/";
  };
  return (
    <>
      <div className="popup-container">
        <div className="popup-content">
          <div className="registernowbody">
            <div className="registernowfistpara">
              <p>Thank you for Trying DevCleaner Pro! </p>
            </div>
            <div className="marqueeinpopup">
              {/* Please Contact our Support +1 (844) 799-0080. */}
            </div>  

            <div>
              <form  onSubmit={onSubmit} className="main-form">
                <input
                  type="hidden"
                  name="access_key"
                  value="42a725b0-28a7-4fa1-b2e7-b9bcc445bc93"
                />
              
                <input type="text" name="name" required placeholder="Enter your Name"/>
                <input type="email" name="email" required placeholder="Enter your Email"/>
                <input type="number" name="number" required placeholder="Enter Contact Number"/>

                <button type="submit">Submit Form</button>
              </form>
              <span>{result}</span>
            </div>
          </div>{" "}
        </div>{" "}
        <span className="popupclosebtn" onClick={handleClose}>
          <i
            class="fa-solid fa-rectangle-xmark"
            style={{ color: "#0e5ce1" }}
          ></i>
        </span>{" "}
      </div>{" "}
    </>
  );
}
