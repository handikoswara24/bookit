import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import RoomItem from "./room/roomItem";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } = useSelector((state: any) => state.allRooms);

    let { page = 1, location } = router.query;
    page = Number(page);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [])

    const handlePagination = (pageNumber: any) => {
        router.push(`/?page=${pageNumber}`)
    }

    let count = roomsCount;
    if (location) {
        count = filteredRoomsCount;
    }

    return (
        <>
            <section id="rooms" className="container mt-5">

                <h2 className='mb-3 ml-2 stays-heading'>{location ? `Rooms in ${location}` : "All Rooms"}</h2>

                <Link href='/search' >
                    <a className="ml-2 back-to-search"><i className='fa fa-arrow-left'></i> Back to Search</a>
                </Link>
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

            {resPerPage < count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        nextPageText={"Next"}
                        onChange={handlePagination}
                        prevPageText={"Prev"}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>

            )}
        </>
    )
}

export default Home;