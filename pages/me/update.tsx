import { getSession } from "next-auth/react";
import React from "react";
import Layout from "../../components/layout/Layout";
import Profile from "../../components/user/profile";

const UpdateProfilePage = () => {
    return (
        <Layout title="Update Profile">
            <Profile />
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

export default UpdateProfilePage;