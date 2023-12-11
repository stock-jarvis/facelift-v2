import { Button } from 'antd'
import LightBulb from '../../../assets/images/light-bulb.jpg'
export default function FirstContainer() {
	return (
		<div className="flex flex-row w-full p-20">
			<div className="flex flex-col w-1/2 p-20">
				<p className="text-sm lg:text-lg text-slate-500 font-medium mb-[.5rem] opacity-[.67] ">
					- FREE 1 DAY TRIAL
				</p>
				<div className="text-[2.5rem] lg:text-[3rem] font-medium">
					<span className="mr-4 text-rose-900">Backtest</span>
					<span>with</span>
					<p>Power of</p>
					<p>Tickwise Data</p>
				</div>
				<div className="text-lg lg:text-4xl text-sky-400 font-medium mt-[2rem] lg:mt-[3rem]">
					<span className="mr-4 text-[#22498e]">NSE</span>
					<span className="mr-4 text-[#199847]">MCX</span>
					<span className="mr-4 text-[#cf242c]">CURRENCY</span>
				</div>
				<div className="mt-[3rem] flex flex-row justify-between">
					<Button size="large" className="bg-sky-400 text-white">
						Try for free
					</Button>
					<Button size="large">See how it works</Button>
				</div>
			</div>
			<div className="flex  w-1/2 justify-center">
				<img src={LightBulb} alt="Image" className="w-1/2" />
			</div>
			{/* <Image
						src={simulator.src}
						alt="TradingView"
						width={900}
						height={900}
						objectFit="contain"
						className="lg:ml-[5rem]"
					/> */}
			{/* <img
            src={simulator.src}
            alt="TradingView"
            className="max-w-full h-full lg:ml-[5rem]"
          /> */}
		</div>
	)
}
