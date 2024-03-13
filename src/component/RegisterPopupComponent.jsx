import React, { useState } from "react";
import lock from "../Image/locker.png";
import key from "../Image/key.png";
import Swal from "sweetalert2";
export default function RegisterPopupComponent({ onClose }) {
  const [userDetail, setuserDetail] = useState("");
  const handleClose = () => {
    onClose();
    // window.location.href = "/";
  };
  const handleUserInformation = async () => {
    try {
      const response = await fetch("http://localhost:5000/UserInformation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userDetail.name,
          email: userDetail.email,
          contact: userDetail.contact,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("licenseKey", JSON.stringify(data));
        onClose();
        // window.alert("data is correct")
        Swal.fire("Your Email and Password is Correct");

        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 3000);
      } else {
        console.log("not matched");
        // window.alert("email or password is incorrect")
        onClose();
        Swal.fire({
          icon: "error",
          title: "email or password is incorrect",
          text: "Something went wrong!",
          footer: '<a href="#">Incorrect  your email or password</a>',
        });
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 3000);
      }
    } catch (error) {
      console.log("Server is not call");
    }
  };
  return (
    <>
    <div className="popup-background">
      <div className="popup-container">
        <div className="popup-content">
          <div className="registernowbody">
            <div className="registernowfistpara">
              <p>Thank you for Trying DevCleaner Pro! </p>
            </div>
            <div className="marqueeinpopup">
              Please Contact our Support +1 (844) 799-0080.
            </div>
            <div className="registernowalreadyhavekey">
              <div className="registernowalreadyhavekeypartone">
                <div className="registernowimg">
                  <img src={lock} alt="" srcset="" />
                </div>
              </div>
              <div className="registernowalreadyhavekeyparttwo">
                <div className="registernowalreadyhavekeyparttwoin">
                  <div className="registernowinput">
                    <div className="registernowinputfirst">
                      <label htmlFor="name">Enter Your Name:</label>
                      <input
                        required
                        onChange={(e) =>
                          setuserDetail({
                            ...userDetail,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        name="name"
                        className="form-control"
                      />
                      <label htmlFor="email">Enter Your Email Address:</label>
                      <input
                        required
                        onChange={(e) =>
                          setuserDetail({
                            ...userDetail,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <label htmlFor="contact">Contacts:</label>
                      <input
                        required
                        onChange={(e) =>
                          setuserDetail({
                            ...userDetail,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="number"
                        name="contact"
                        className="form-control"
                      />
                      <div className="registernowinputfirstbutton">
                        <button onClick={handleUserInformation}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      </div>
    </>
  );
}
