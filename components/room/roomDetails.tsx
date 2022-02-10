import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/roomActions";
import RoomFeatures from "./roomFeatures";
import { useRouter } from "next/router";
import axios from "axios";
import { checkBooking, getBookedDates } from "../../redux/actions/bookingActions";
import { CHECK_BOOKING_RESET } from "../../redux/constants/bookingConstants";
import getStripe from "../../utils/getStripe";
import NewReview from "../review/NewReview";
import ListReviews from "../review/ListReviews";

const RoomDetails = ({ }: any) => {
    const dispatch = useDispatch();

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState(0);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const router = useRouter();

    const { booked } = useSelector((state: any) => state.bookedDates);
    const { user } = useSelector((state: any) => state.loadUser);
    const { room, error } = useSelector((state: any) => state.roomDetails);
    const { available, loading: bookingLoading } = useSelector((state: any) => state.checkBooking);

    const { id } = router.query;

    const excludedDates: any[] = [];

    if (booked) {
        booked.forEach((element: any) => {
            excludedDates.push(new Date(element));
        });
    }


    const onChange = (dates: any) => {
        const [checkIn, checkOut] = dates;

        setCheckInDate(checkIn);
        setCheckOutDate(checkOut);

        if (checkIn && checkOut) {
            //@ts-ignore
            const days = Math.floor((new Date(checkOut) - new Date(checkIn)) / 86400000);
            setDaysOfStay(days);

            dispatch(checkBooking(id, checkIn.toISOString(), checkOut.toISOString()));
        }
    }

    const newBookingHandler = async () => {
        const bookingData = {
            room: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: "STRIPE_PAYMENT_ID",
                status: "STRIPE_PAYMENT_STATUS",
            }
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post("/api/bookings", bookingData, config);

            console.log(data);
        } catch (error: any) {
            console.log(error.response);
        }
    }

    const bookRoom = async (id: any, pricePerNight: any) => {
        setPaymentLoading(true);

        const amount = pricePerNight * daysOfStay;

        try {
            //@ts-ignore
            const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`

            const { data } = await axios.get(link, { params: { amount } });
            const stripe = await getStripe();
            stripe.redirectToCheckout({ sessionId: data.id });

            setPaymentLoading(false);

        } catch (error: any) {
            setPaymentLoading(false);
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        dispatch(getBookedDates(id));
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }
    }, [dispatch, id])

    return (
        <>
            <Head>
                <title>{room.name} - BookIT</title>
            </Head>
            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>
                <p>{room.address}</p>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(room.ratings) / 5 * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>

                <Carousel pause="hover">
                    {room.images && room.images.map((image: any) => (
                        <Carousel.Item key={image.public_id}>
                            <div style={{ width: "100%", height: "440px" }}>
                                <Image className="d-block m-auto" src={image.url} alt={room.name} layout="fill" />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>


                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>
                        <RoomFeatures room={room} />
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>
                            <hr />
                            <p className="mt-5 mb-3">
                                Pick Check In & Check Out Date
                            </p>
                            <DatePicker
                                className="w-100"
                                onChange={onChange}
                                selected={checkInDate}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                selectsRange
                                //@ts-ignore
                                excludeDates={excludedDates}
                                inline
                            />

                            {available === true && (
                                <div className="alert alert-success my-3 font-weight-bold">
                                    Room is available. Book Now.
                                </div>
                            )}
                            {available === false && (
                                <div className="alert alert-danger my-3 font-weight-bold">
                                    Room is not available. Try Different Dates.
                                </div>
                            )}
                            {available && !user && (
                                <div className="alert alert-success my-3 font-weight-bold">
                                    Login to book room
                                </div>
                            )}

                            {available && user && (
                                <button className="btn btn-block py-3 booking-btn w-100"
                                    onClick={() => bookRoom(room._id, room.pricePerNight)}
                                    disabled={bookingLoading || paymentLoading}>
                                    Pay - ${daysOfStay * room.pricePerNight}
                                </button>
                            )}



                        </div>
                    </div>
                </div>

                <NewReview />

                {room.reviews && room.reviews.length > 0 ? (
                    <ListReviews reviews={room.reviews} />
                ) : (
                    <p>
                        <b>No Reviews in this room</b>
                    </p>
                )}
            </div>
        </>
    )
}

export default RoomDetails;