import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";
import OrderHistory from "../components/OrderHistory";
import EmailPreferences from "../components/EmailPreferences";
import NewPayment from "../components/NewPayment";
import NewAddress from "../components/NewAddress";

import "./account.css"; // Assuming you have a CSS file for styling
  const AccountSetting = () => (
    <div className="account-settings">
      <div className="container mt-4 flex flex-row gap-4">
      <div className="history flex flex-1 flex-col">
      <OrderHistory />
      <EmailPreferences />
      <NewAddress/>
      </div>
      <div className="rest flex flex-col flex-1">

      <NewPayment />
      
      <UpdateProfile />
      
      <ChangePassword />
      </div>
      </div>
    </div>
  );
  
  export default AccountSetting;