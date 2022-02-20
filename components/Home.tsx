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

    let { page = 1, location, guests, category } = router.query;
    page = Number(page);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [])

    const handlePagination = (pageNumber: any) => {
        let link = `/?page=${pageNumber}`;
        if (location) {
            link += `&location=${location}`;
        }

        if (guests) {
            link += `&guests=${guests}`
        }

        if (category) {
            link += `&category=${category}`;
        }
        router.push(link);
    }

    let count = roomsCount;
    if (location || guests || category) {
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
                    {rooms == null || rooms.length === 0 ?
                        (<div>
                            <div className="alert alert-danger mt-5 w-100">
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
                        totalItemsCount={count}
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