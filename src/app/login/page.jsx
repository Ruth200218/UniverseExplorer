"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email: email,
                password: password,
                redirect: false,
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                if (res?.error) {
                    return setError(res.error);
                } else {
                    throw new Error(errorData.message || "Error to try login");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
            {error && <div>{error}</div>}
            <h3>Login</h3>

            <label>Email</label>
            <input
                required
                onChange={(e) => setEmail(e.target.value)}
                className="border border-slate-500 px-8 py-2"
                type="email"
                placeholder="Write your email"
                name="email" />

            <label>Password</label>
            <input
                required
                onChange={(e) => setPassword(e.target.value)}
                className="border border-slate-500 px-8 py-2"
                type="password"
                placeholder="Write your password"
                name="password" />

            <button>SignIn</button>
        </form>
    );
}