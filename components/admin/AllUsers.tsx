import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { getAdminUsers, clearErrors } from '../../redux/actions/userActions'

const AllUsers = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, users } = useSelector((state: any) => state.allUsers)
    //const { error: deleteError, isDeleted } = useSelector((state : any) => state.user)

    useEffect(() => {

        dispatch(getAdminUsers())

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        // if (deleteError) {
        //     toast.error(deleteError);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     router.push('/admin/users')
        //     dispatch({ type: DELETE_USER_RESET })
        // }

    }, [dispatch, error])


    const setUsers = () => {
        const data: any = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users && users.forEach((user: any) => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                    <>
                        <Link href={`/admin/users/${user._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteUserHandler(user._id)}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }

    const deleteUserHandler = (id: any) => {
        // dispatch(deleteUser(id))
    }


    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${users && users.length} Users`}</h1>


                    <MDBDataTable
                        data={setUsers()}
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

export default AllUsers;