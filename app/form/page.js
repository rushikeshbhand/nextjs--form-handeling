'use client'; // Ensure this is at the top of the file

import React, { useState } from 'react';

export default function Form() {
    // State variables to hold form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // State variable to hold response message

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send form data to the server
            const response = await fetch('/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }), // Convert form data to JSON format
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse the JSON response
            setMessage(data.message); // Update the message state with the server response
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while submitting the form'); // Display error message
        }
    };

    return (
        <div className='bg-slate-600 h-screen'>
            <h1 className='text-center text-white text-3xl font-serif'>Submit This Form</h1>
            <hr />
            <form className='mx-96 flex gap-10 text-white' onSubmit={handleSubmit}>
                <div className='mt-5'>
                    <label htmlFor="name" className='black'>Name: </label>
                    <input
                        type="text"
                        id='name'
                        value={name}
                        onChange={(e) => { setName(e.target.value); }} // Update name state on input change
                        required
                        title='Enter your name'
                        className='py-2 pl-5 font-mono bg-slate-200 text-black rounded-lg focus:outline-green-800'
                    />
                </div>

                <div className='mt-5'>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }} // Update email state on input change
                        required
                        title='Enter your email'
                        className='py-2 pl-5 font-mono bg-slate-200 text-black rounded-lg focus:outline-green-800'
                    />
                </div>

                <input
                    type="submit"
                    className='mt-5 px-5 bg-green-500 rounded-xl hover:bg-green-600'
                />
            </form>
            {message && <p className='text-center text-white mt-5'>{message}</p>} {/* Display message if available */}
        </div>
    );
}
