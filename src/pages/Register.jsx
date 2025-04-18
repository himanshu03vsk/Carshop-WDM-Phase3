import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Redirect after successful registration
import { useAuth } from '../context/AuthContext'; // Import useAuth context hook

const Register = () => {
    const [email, setEmail] = useState('');
    const [p_password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [carrier, setCarrier] = useState(''); // Added carrier state

    const { login } = useAuth(); // Access login function from context
    const navigate = useNavigate(); // To navigate after registration

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make the registration request
            const response = await axios.post('http://localhost:3000/api/auth/register', {
                email,
                p_password, // Use 'password' as expected by most backends
                fname,
                lname,
                dob,
                phone,
                carrier
            });

            // Handle successful registration (e.g., redirect to login page)
            console.log('Registration successful:', response.data);

            // Assuming the response includes the token and user data
            login(response.data.user, response.data.token); // Login the user after registration
            console.log('User logged in:', response.data.user);
            navigate('/login'); // Redirect to the login page

        } catch (error) {
            console.error('Registration error:', error);
            // Handle different types of error messages
            if (error.response && error.response.status === 400) {
                setError('Email already exists');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={p_password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div>
            <label htmlFor="carrier">Carrier</label>
            <select
                id="carrier"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                required
            >
                <option value="">Select a Carrier</option>
                <option value="Verizon">Verizon</option>
                <option value="AT&T">AT&T</option>
                <option value="T-Mobile">T-Mobile</option>
                <option value="Sprint">Sprint</option>
            </select>
        </div>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
