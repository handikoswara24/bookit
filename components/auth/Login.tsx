import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import ButtonLoader from "../layout/ButtonLoader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitHandler = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const result: any = await signIn("credentials", {
            redirect: false,
            email, password
        });

        setLoading(false);
        if (result.error) {
            toast.error(result.error);
        }
        else {
            router.push("/");
        }
    }

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <Link href="/password/forgot"><a className="mb-4">Forgot Password?</a></Link>
                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 w-100 mt-0"
                            disabled={loading}
                        >
                            {loading ? <ButtonLoader /> : "LOGIN"}
                        </button>
                        <div className="d-flex flex-row-reverse">
                            <Link href="/register"><a>New User?</a></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;