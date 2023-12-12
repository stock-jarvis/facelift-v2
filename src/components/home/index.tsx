import Footer from './views/footer'
import Nav from './common/nav'
import { Outlet } from 'react-router-dom'
const Home = () => {
	return (
		<div className="flex w-full p-0 m-0 flex-col gap-20">
			<Nav />

			<Outlet />
			<Footer />
		</div>
	)
}

export default Home
