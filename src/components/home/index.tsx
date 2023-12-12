import Footer from './sections/views/footer'
import Nav from './sections/custom/nav'
import { Outlet } from 'react-router-dom'
const Home = () => {
	return (
		<div className="flex w-full p-0 m-0 flex-col gap-20">
			<Nav />
			<Outlet />
			<div className="w-[100%] flex flex-row justify-center">
				<Footer />
			</div>
		</div>
	)
}

export default Home
