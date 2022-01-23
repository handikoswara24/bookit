import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, resetPassword } from "../../redux/actions/userActions";
import ButtonLoader from "../layout/ButtonLoader";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const { error, loading, success } = useSelector((state: any) => state.forgotPassword);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            router.push("/login");
        }
    }, [dispatch, success, error]);

    const submitHandler = (e: any) => {
        e.preventDefault();

        const userData = {
            password, confirmPassword
        };

        dispatch(resetPassword(router.query.token, userData));
    }

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

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

                    <div className="mb-3">
                        <label htmlFor="confirm_password_field" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3 w-100"
                        disabled={loading} >
                        {loading ? <ButtonLoader /> : "Set Password"}
                    </button>

                </form>
            </div>
        </div>
    )
};

export default NewPassword;