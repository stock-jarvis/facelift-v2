import React from 'react'
import Image from 'next/image'
import algoBacktest from '../../../../public/images/multi-exchange-simulator.png'
import Link from 'next/link'

const SixthContainer = () => {
	return (
		<div className="px-[1rem] py-[1rem] lg:px-[12rem] lg:py-[7rem]">
			<div className="grid grid-cols-12 bg-[#fff] p-10 shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl">
				<div className="col-span-12 lg:col-span-6 ml-[0rem] lg:ml-[2rem] mb-[3rem] lg:mb-[0rem] flex flex-col justify-center">
					<div className="text-[2rem] lg:text-[3rem] font-medium">
						<p>
							Get started with <br /> StockJarvis today
						</p>
					</div>
					<p className="text-base text-slate-500 mt-6">
						Get your 6 hour free trial now.
					</p>
					<div className="mt-[2rem] lg:mt-[3rem]">
						<Link href={'/signup'}>
							<button className="bg-blue-600 text-white text-sm lg:text-lg hover:bg-blue-700 py-[.5rem] lg:py-[.7rem] px-[1rem] lg:px-[3rem]  rounded-lg">
								Sign up now
							</button>
						</Link>
					</div>
				</div>
				<div className="col-span-12 lg:col-span-6">
					<Image
						src={algoBacktest.src}
						alt="TradingView"
						width={900}
						height={900}
						objectFit="contain"
					/>
				</div>
			</div>
		</div>
	)
}

export default SixthContainer
