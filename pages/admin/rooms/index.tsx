import { getSession } from "next-auth/react";
import React from "react";
import AllRooms from "../../../components/admin/AllRooms";
import Layout from "../../../components/layout/Layout";


const AllRoomsPage = () => {
    return (
        <Layout title="All Rooms">
            <AllRooms />
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

export default AllRoomsPage;