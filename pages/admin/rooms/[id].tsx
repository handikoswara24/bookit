import { getSession } from "next-auth/react";
import React from "react";
import NewRoom from "../../../components/admin/NewRoom";
import UpdateRoom from "../../../components/admin/UpdateRoom";
import Layout from "../../../components/layout/Layout";

const UpdateRoomPage = () => {
    return (
        <Layout title="Update Room">
            <UpdateRoom />
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

export default UpdateRoomPage;