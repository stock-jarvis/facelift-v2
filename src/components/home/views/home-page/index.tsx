import Simulation from '../simulation'
import BackTest from '../backtest'
import Starter from '../starter'
import Guides from '../guides'
import Main from '../main'
import Testimonials from '../testimonials'
import Partner from '../partner'

const index = () => {
	return (
		<>
			<Main />
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Simulation />
					<BackTest />
					<Guides />
					<Testimonials />
					<Partner />
					<Starter />
				</div>
			</div>
		</>
	)
}

export default index
