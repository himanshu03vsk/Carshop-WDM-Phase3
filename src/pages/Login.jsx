import React from "react";
import style from './login_out.module.css';

const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className={style.loginContainer}>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>

                <div className={style.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Email Address" required />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Password" required />
                </div>

                <div className={style.formGroup}>
                    <label htmlFor="accountType">Account Type</label>
                    <select id="accountType" name="accountType" required>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>

            <div className={style.formFooter}>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default Login;
