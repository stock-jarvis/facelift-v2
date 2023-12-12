import React from 'react'

export default function Partner() {
	return (
		<div className="px-[1rem] py-[0rem] lg:px-[12rem] lg:py-[1rem] my-[5rem] w-full h-full">
			<p className="text-slate-500 text-xl font-medium lg:text-4xl text-center ">
				Engaging with premier organizations and individuals across the globe.
			</p>
			<div className="grid grid-cols-12 gap-x-0 lg:gap-x-8 mt-[4rem]">
				<div className="col-span-12 mb-[3rem] lg:mb-0 lg:col-span-4 text-[15px] items-center flex flex-col">
					<img
						src={'/images/tradingview-logo.png'}
						alt="tradingview logo"
						className="w-[90%]"
					/>
					<div className="mt-[2rem] w-[95%] lg:mt-[3rem] lg:w-[100%] text-slate-700 leading-[1.6rem]">
						TradingView is a charting platform for traders and investors, loved
						and visited by millions of users worldwide. It offers
						state-of-the-art charting tools and a space where people driven by
						markets can chat, chart, and prepare for trades. Among other things,
						it provides the essence of market research — data — and presents it
						in various forms: you can track important upcoming events in the{' '}
						<a
							target="_blank"
							href="https://www.tradingview.com/economic-calendar/"
							className="text-indigo-600 underline font-medium"
						>
							Economic calendar
						</a>{' '}
						or browse stocks in the{' '}
						<a
							target="_blank"
							href="https://www.tradingview.com/screener/"
							className="text-indigo-600 underline font-medium"
						>
							Screener
						</a>{' '}
						to find the best opportunities for your portfolio. Whatever your
						trading strategy needs, just visit TradingView.
					</div>
				</div>

				<div className="col-span-12 mb-[3rem] lg:mb-0  lg:col-span-4 text-[15px] items-center flex flex-col">
					<img src={'/images/gcp.png'} alt="google cloud" className="w-[90%]" />
					<div className="mt-[2rem] w-[95%] lg:mt-[2rem] lg:w-[100%] text-slate-700 leading-[1.6rem]">
						Google Cloud is a leading cloud computing platform embraced by
						millions globally. With cutting-edge tools and a collaborative
						environment, it empowers businesses to innovate and streamline
						operations. From advanced analytics to scalable storage solutions,
						Google Cloud offers the core of digital transformation — data —
						delivered in diverse formats. Track pivotal market trends through
						AI-driven insights or optimize workflows with versatile APIs.
						Whatever your business demands, Google Cloud stands ready to drive
						growth and efficiency for your organization on a global scale.
					</div>
				</div>

				<div className="col-span-12 mb-[3rem] lg:mb-0 lg:col-span-4 text-[15px] items-center flex flex-col">
					<img
						src={'/images/highcharts.png'}
						alt="highcharts cloud"
						className="w-[90%]"
					/>
					<div className="mt-[2rem] w-[95%] lg:mt-[3rem]lg:w-[100%] text-slate-700 leading-[1.6rem]">
						Highcharts stands as a premier data visualization platform, trusted
						by countless users worldwide. It furnishes dynamic and interactive
						charts that enhance understanding and decision-making. With
						versatile options and seamless integrations, Highcharts empowers
						developers to craft compelling data-driven narratives. Transform raw
						data into insightful visuals that resonate with your audience,
						whether it's for business reporting or data journalism. From line
						graphs to heatmaps, Highcharts encapsulates the essence of data
						representation, offering an array of tools to empower your
						storytelling and engage your audience effectively.
					</div>
				</div>
			</div>
		</div>
	)
}
