import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors, registerUser } from "../../redux/actions/userActions";
import ButtonLoader from "../layout/ButtonLoader";

const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        password: "",
        email: ""
    });

    const { name, password, email } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

    const { loading, success, error } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (success) {
            router.push("/login");
        }

        if (error) {
            if (error.includes("Login")) {
                return;
            }
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, success])

    const submitHandler = (e: any) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            avatar
        }

        dispatch(registerUser(userData));
    };

    const onChange = (e: any) => {
        if (e.target.name == "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState == 2) {
                    setAvatar(reader.result as string);
                    setAvatarPreview(reader.result as string);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Join Us</h1>

                        <div className="mb-3">
                            <label htmlFor="name_field" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                name="name"
                                className="form-control"
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email_field" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                name="password"
                                onChange={onChange}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='avatar_upload' className="form-label">Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='image'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='form-control'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />

                                </div>
                            </div>
                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 w-100"
                            disabled={loading}
                        >
                            {loading ? <ButtonLoader /> : "REGISTER"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;