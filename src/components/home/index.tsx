import Intro from '../home/sections/intro'
import HowItWorks from './sections/howItWorks'
import Testing from './sections/testing'
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
				<div className="w-[80%]">
					<Testing />
				</div>
			</div>
		</div>
	)
}

export default Home
