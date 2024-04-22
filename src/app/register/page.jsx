"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Register() {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const signUpResponse = await fetch("http://localhost:3000/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ first_name, last_name, email, password }),
                }
            );

            if (signUpResponse.ok) {

                const res = await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false,
                });

                if (res.ok) {
                    router.push("/dashboard");
                    router.refresh();
                }
            } else {
                const errorData = await signUpResponse.json();
                if (errorData.erros) {
                    setError(errorData.errors);
                } else {
                    throw new Error(errorData.message || "Error to signup");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
            {error && <div>{error}</div>}
            <h3>SignUp</h3>

            <label>Name</label>
            <input
                required
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Write your name"
                name="first_name" />

            <label>Last Name</label>
            <input
                required
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Write your last name"
                name="last_name" />

            <label>Email</label>
            <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write your email"
                name="email" />

            <label>Password</label>
            <input
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Write your password"
                name="password" />

            <button>SignUp</button>
        </form>
    );
};
