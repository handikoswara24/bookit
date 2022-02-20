import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, deleteBooking, getAdminBookings } from "../../redux/actions/bookingActions";
import easyinvoice from "easyinvoice";
import Loader from "../layout/Loader";
import { useRouter } from "next/router";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";


const AllBookings = () => {

    const dispatch = useDispatch();

    const { bookings, error, loading } = useSelector((state: any) => state.bookings);
    const { isDeleted, error: deleteError } = useSelector((state: any) => state.booking);
    const router = useRouter();

    useEffect(() => {

        dispatch(getAdminBookings());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            router.push("/admin/bookings");
            dispatch({ type: DELETE_BOOKING_RESET })
        }
    }, [dispatch, deleteError, isDeleted]);

    const setBookings = () => {
        const data: any = {
            columns: [{
                label: "Booking ID",
                field: "id",
                sort: "asc"
            }, {
                label: "Check In",
                field: "checkIn",
                sort: "asc"
            }, {
                label: "Check Out",
                field: "checkOut",
                sort: "asc"
            }, {
                label: "Amount Paid",
                field: "amount",
                sort: "asc"
            },
            {
                label: "Actions",
                field: "actions",
                sort: "asc"
            }],
            rows: []
        }

        bookings && bookings.forEach((booking: any) => {
            data.rows.push({
                id: booking._id,
                checkIn: new Date(booking.checkInDate).toLocaleDateString("en-US"),
                checkOut: new Date(booking.checkOutDate).toLocaleDateString("en-US"),
                amount: `$${booking.amountPaid}`,
                actions: <>
                    <Link href={`/bookings/${booking._id}`}>
                        <a className="btn btn-primary">
                            <i className="fa fa-eye"></i>
                        </a>
                    </Link>

                    <button className="btn btn-success mx-2" onClick={() => downloadInvoice(booking)}>
                        <i className="fa fa-download"></i>
                    </button>

                    <button className="btn btn-danger mx-2" onClick={() => deleteBookingHandler(booking._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        });

        return data;
    }

    const deleteBookingHandler = (id: any) => {
        dispatch(deleteBooking(id));
    }

    const downloadInvoice = async (booking: any) => {
        const data = {
            "documentTitle": "Booking INVOICE", //Defaults to INVOICE
            "currency": "USD",
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
            "sender": {
                "company": "Book IT",
                "address": "13th Street. 47 W 13th St",
                "zip": "10001",
                "city": "New York",
                "country": "United States"
            },
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "information": {
                // Invoice number
                "number": `${booking._id}`,
                // Invoice data
                "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
                // Invoice due date
                "due-date": `${new Date(Date.now()).toLocaleString('en-US')}`
            },
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax-rate": 0,
                    "price": Number(booking.room.pricePerNight)
                }
            ],
            "bottomNotice": "This is auto generated Invoice of your booking on Book IT."
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
    };
    return (
        <div className="container container-fluid">
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${bookings && bookings.length} Bookings`}</h1>

                    <MDBDataTable
                        data={setBookings()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </>
            }
        </div>
    )
}

export default AllBookings;