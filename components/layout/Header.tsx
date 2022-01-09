import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container" style={{ maxWidth: "1320px" }}>
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href="/">
                            <img style={{ cursor: "pointer" }} src="/images/bookit_logo.png" alt="BookIT" />
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-end">
                    <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                </div>
            </div>
        </nav>
    )
}

export default Header;