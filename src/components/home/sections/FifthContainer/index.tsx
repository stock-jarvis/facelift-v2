import React from 'react'
import Image from 'next/image'
import howToTest from '../../../../public/images/algo-backtest.png'
import Link from 'next/link'

const FifthContainer = () => {
	return (
		<div className="px-[1rem] py-[1rem] lg:px-[12rem] lg:py-[7rem]">
			<div className="grid grid-cols-12 place-items-start lg:place-items-center bg-[#fff] p-10 shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] rounded-xl">
				<div className="col-span-12 lg:col-span-6 ml-[0rem] lg:ml-[2rem] mb-[3rem] lg:mb-[0rem] flex flex-col justify-center">
					<Image
						src={howToTest.src}
						alt="TradingView"
						width={900}
						height={900}
						objectFit="contain"
					/>
					<div className="text-[2rem] lg:text-[2rem] font-medium mt-[2rem]">
						<p className="whitespace-nowrap">How to backtest in</p>
						<p>simulator</p>
					</div>
					<p className="text-base text-slate-500 mt-6">
						Just 3 simple steps to optimize your
					</p>
					<p className="text-base text-slate-500">backtesting experience.</p>
					<div className="mt-[1.5rem]">
						<Link href={'/signup'}>
							<button className="bg-blue-600 text-white text-sm lg:text-base hover:bg-blue-700 py-[.5rem] lg:py-[.7rem] px-[1rem] lg:px-[3rem]  rounded-lg">
								Sign up now
							</button>
						</Link>
					</div>
				</div>

				<div className="col-span-12 lg:col-span-6">
					<div className="border-b-[2px] border-slate-200 pb-[3rem]">
						<h2 className="text-[1.5rem] font-medium">Step 1</h2>
						<p className="text-sm text-slate-500 mt-2">
							Load any day and time in the past.
						</p>
					</div>

					<div className="border-b-[2px] border-slate-200 pb-[3rem] mt-[3rem]">
						<h2 className="text-[1.5rem] font-medium">Step 2</h2>
						<p className="text-sm text-slate-500 mt-2">
							Our simulator will load the data for <br /> that day of all
							instruments
						</p>
					</div>

					<div className="border-b-[2px] border-slate-200 pb-[3rem] mt-[3rem]">
						<h2 className="text-[1.5rem] font-medium">Step 3</h2>
						<p className="text-sm text-slate-500 mt-2">
							Add into the position the trade you <br /> want to take and
							backtest
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FifthContainer
