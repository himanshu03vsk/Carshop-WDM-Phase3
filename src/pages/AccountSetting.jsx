import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";
import OrderHistory from "../components/OrderHistory";
import EmailPreferences from "../components/EmailPreferences";

const AccountSetting = () => (
    <div className="account-settings">
      <h2>Account Settings</h2>
      <div className="container" style={{ marginTop: "20px", display: "flex", flexDirection: "row"}}>
      <div className="history" style={{display: "flex", flexDirection: "column", flex: "1", flexGrow: "1"}}>
      <OrderHistory />
      </div>
      <div className="rest" style={{display: "flex", flexDirection: "column", flex: "1", flexGrow: "1"}}>
      <UpdateProfile />
      <ChangePassword />
      <EmailPreferences />
      </div>
      </div>
    </div>
  );
  
  export default AccountSetting;