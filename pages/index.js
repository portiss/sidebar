import Head from 'next/head'
import SideBar from '../components/SideBar'

const sidebar = () => (
  <div className="container">
    <Head>
      <title>side bar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SideBar />
  </div>
)

export default sidebar
