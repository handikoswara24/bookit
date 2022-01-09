import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import RoomItem from "./room/roomItem";

const Home = () => {
    const dispatch = useDispatch();

    const { rooms, error } = useSelector((state: any) => state.allRooms);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [])

    return (
        <section id="rooms" className="container mt-5">

            <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

            <a href='#' className='ml-2 back-to-search'> <i className='fa fa-arrow-left'></i> Back to Search</a>
            <div className="row">
                {rooms.length === 0 ?
                    (<div>
                        <div className="alert alert-danger">
                            <b>No Rooms.</b>
                        </div>
                    </div>) :
                    rooms && rooms.map((room: any) => {
                        return (
                            <RoomItem key={room._id} room={room} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Home;