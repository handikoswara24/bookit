import { getSession } from "next-auth/react";
import React from "react";
import AllUsers from "../../../components/admin/AllUsers";
import Layout from "../../../components/layout/Layout";

const AllUsersPage = () => {
    return (
        <Layout title="All Rooms">
            <AllUsers />
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });

    //@ts-ignore
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default AllUsersPage;