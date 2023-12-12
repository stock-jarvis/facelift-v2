import Intro from '../home/sections/intro'
import HowItWorks from './sections/howItWorks'
import BackTest from './sections/views/backtest'
import Starter from './sections/views/starter'

const Home = () => {
	return (
		<div className="flex w-full p-0 m-0 flex-col gap-20">
			<Intro />
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<HowItWorks />
				</div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]"></div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<BackTest />
				</div>
			</div>
			<div className="w-[100%] flex flex-row justify-center">
				<div className="w-[80%]">
					<Starter />
				</div>
			</div>
		</div>
	)
}

export default Home
