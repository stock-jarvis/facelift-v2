import Main from './sections/views/main'
import Simulation from './sections/views/simulation'
import BackTest from './sections/views/backtest'
import Starter from './sections/views/starter'
import Guides from './sections/views/guides'
import Footer from './sections/views/footer'
import Testimonials from './sections/views/testimonials'
import Partner from './sections/views/partner'

import Nav from './sections/custom/nav'
const Home = () => {
	return (
		<div className="flex w-full p-0 m-0 flex-col gap-20">
			<Nav />
			<Main />

			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Simulation />
				</div>
			</div>

			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<BackTest />
				</div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Guides />
				</div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Testimonials />
				</div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Partner />
				</div>
			</div>

			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Starter />
				</div>
			</div>

			<div className="w-[100%] flex flex-row justify-center">
				<Footer />
			</div>
		</div>
	)
}

export default Home
