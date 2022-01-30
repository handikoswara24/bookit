import { getSession } from "next-auth/react";
import React from "react";
import MyBookings from "../../components/booking/MyBookings";
import Layout from "../../components/layout/Layout";
import { myBookings } from "../../redux/actions/bookingActions";
import { wrapper } from "../../redux/store";

const MyBookingPage = () => {
    return (
        <Layout title="My Bookings">
            <MyBookings />
        </Layout>
    )
};


// export async function getServerSideProps(context: any) {
//     const session = await getSession({ req: context.req });

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             session
//         }
//     }
// }

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }: any) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))
})

export default MyBookingPage;