import React from 'react'
import { getSession } from 'next-auth/react'

import BookingDetails from '../../../components/booking/BookingDetails'
import Layout from '../../../components/layout/Layout'
import { wrapper } from '../../../redux/store'
import { bookingDetails } from '../../../redux/actions/bookingActions'

const BookingDetailsPage = () => {
    return (
        <Layout title='Booking Details'>
            <BookingDetails />
        </Layout>
    )
}

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

export default BookingDetailsPage