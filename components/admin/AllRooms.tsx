import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, deleteRoom, getAdminRooms } from "../../redux/actions/roomActions";
import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstant";
import Loader from "../layout/Loader";

const AllRooms = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, rooms } = useSelector((state: any) => state.allRooms);

    const { error: deleteError, isDeleted } = useSelector((state: any) => state.updateRoom);

    useEffect(() => {

        dispatch(getAdminRooms());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            router.push("/admin/rooms");
            dispatch({ type: DELETE_ROOM_RESET })
        }
    }, [dispatch, deleteError, isDeleted])

    const deleteRoomHandler = (id: any) => {
        dispatch(deleteRoom(id));
    }

    const setRooms = () => {
        const data: any = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        rooms && rooms.forEach((room: any) => {
            data.rows.push({
                id: room._id,
                name: room.name,
                price: `$${room.pricePerNight}`,
                category: room.category,
                actions:
                    <>
                        <Link href={`/admin/rooms/${room._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => { deleteRoomHandler(room._id) }}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }

    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <div className="d-flex flex-row justify-content-between">
                        <h1 className='my-5'>{`${rooms && rooms.length} Rooms`}

                        </h1>
                        <div className="my-5">
                            <Link href='/admin/rooms/new'>
                                <a className="mt-0 btn text-white new-room-btn">Create Room</a>
                            </Link>
                        </div>
                    </div>

                    <MDBDataTable
                        data={setRooms()}
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

export default AllRooms;