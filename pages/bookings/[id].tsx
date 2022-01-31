import { getSession } from "next-auth/react";
import React from "react";
import BookingDetails from "../../components/booking/BookingDetails";
import Layout from "../../components/layout/Layout";
import { bookingDetails } from "../../redux/actions/bookingActions";
import { wrapper } from "../../redux/store";

const BookingDetailsPage = () => {
    return (
        <Layout title="My Bookings">
            <BookingDetails />
        </Layout>
    )
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }: any) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id))
})

export default BookingDetailsPage;