import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";
import OrderHistory from "../components/OrderHistory";
import EmailPreferences from "../components/EmailPreferences";

import "./account.css"; // Assuming you have a CSS file for styling
const AccountSetting = () => (
    <div className="account-settings">
      <div className="container" style={{ marginTop: "20px", display: "flex", flexDirection: "row"}}>
      <div className="history" style={{display: "flex", flexDirection: "column", flex: "1", flexGrow: "1"}}>
      <OrderHistory />
      <EmailPreferences />

      </div>
      <div className="rest" style={{display: "flex", flexDirection: "column", flex: "1", flexGrow: "1"}}>
      
      <UpdateProfile />
      
      <ChangePassword />
      </div>
      </div>
    </div>
  );
  
  export default AccountSetting;