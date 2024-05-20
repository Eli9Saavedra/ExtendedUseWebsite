import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterPage.css';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5248/api/users/register', {
                email,
                password, // Make sure you are hashing this if necessary before sending or ideally, hashing should happen server-side
                fullName,
                address,
                phoneNumber
            });
            alert('Registration Successful! You can now log in.');
            // Redirect or clear form here if needed
        } catch (error) {
            alert('Registration Failed: ' + error.response.data);
        }
    };


    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                </div>
                <div className="form-group">
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="form-control" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Address" required />
                </div>
                <div className="form-group">
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control" placeholder="Phone Number" required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
