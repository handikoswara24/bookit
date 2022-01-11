import type { NextPage } from 'next'
import Layout from '../components/layout/Layout'
import Search from '../components/Search'

const Index: NextPage = () => {
    return (
        <Layout title="Search Rooms">
            <Search />
        </Layout>
    )
}

export default Index;
