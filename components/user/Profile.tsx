import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors, registerUser, updateProfile } from "../../redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../redux/constants/userConstant";
import ButtonLoader from "../layout/ButtonLoader";
import Loader from "../layout/Loader";

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, password, email } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

    const { loading, user: loadedUser } = useSelector((state: any) => state.auth);
    const { loading: updateLoading, error, isUpdated } = useSelector((state: any) => state.user);

    useEffect(() => {
        if (loadedUser) {
            setUser({
                name: loadedUser.name,
                email: loadedUser.email,
                password: ""
            });
            setAvatarPreview(loadedUser.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            router.push("/");
            dispatch({ type: UPDATE_PROFILE_RESET })
        }
    }, [dispatch, error, isUpdated, loadedUser])

    const submitHandler = (e: any) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            avatar
        }

        dispatch(updateProfile(userData));
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
        <>
            {loading ? <Loader /> : (
                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Update Profile</h1>

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
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? <ButtonLoader /> : "UPDATE"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>


    )
}

export default Profile;