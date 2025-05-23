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
        <div className="p-5 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gray-500 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={p_password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="carrier">Carrier</label>
                        <select
                            id="carrier"
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a Carrier</option>
                            <option value="Verizon">Verizon</option>
                            <option value="AT&T">AT&T</option>
                            <option value="T-Mobile">T-Mobile</option>
                            <option value="Sprint">Sprint</option>
                        </select>
                    </div>

                    {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
