import RoomDetails from "../../components/room/roomDetails";
import Layout from "../../components/layout/Layout";
import { wrapper } from "../../redux/store";
import { getRoomDetails } from "../../redux/actions/roomActions";

export default function RoomDetailsPage() {
    return (
        <Layout>
            <RoomDetails />
        </Layout>
    )
}

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }: any) => {
    await store.dispatch(getRoomDetails(req, params.id))
})