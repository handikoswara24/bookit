import type { NextPage } from 'next'
import Home from '../components/Home'
import Layout from '../components/layout/Layout'
import { getRooms } from '../redux/actions/roomActions'
import { wrapper } from '../redux/store'

const Index: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index;

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }: any) => {
  await store.dispatch(getRooms(req, query.page))
});
