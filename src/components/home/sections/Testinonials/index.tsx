import React from 'react'
import Rating from '@mui/material/Rating'

const Testinonials = () => {
	const testinonialsData = [
		{
			testimonial:
				"Stockjarvis is a trader's dream. Detailed history for NSE, MCX,Currency is real. Backtesting's powerful, boosts my confidence. Deserves stars for smart trading.",
			name: 'Aarti',
			designation: 'Lead manager',
			style: '',
		},
		{
			testimonial:
				"Stockjarvis is mind-blowing! Secondwise data for NSE, MCX, Currency is gold. Backtesting's super accurate.Like a crystal ball for trading. 5 stars for sure!",
			name: 'Rupesh',
			designation: 'Product Manager',
			style: '',
		},
		{
			testimonial:
				"Secondwise data on NSE, MCX, Currency is gold.Backtesting's my secret to success.Invaluable insights. More than 5 stars!",
			name: 'Madhulika',
			designation: 'CTO',
			style: 'lg:mb-[3.8rem]',
		},
	]

	return (
		<div className="container my-24 mx-auto md:px-6">
			<section className="mb-32 text-center">
				<h2 className="mb-6 text-3xl font-bold">Testimonials</h2>
				<p className="mb-16 lg:mb-24 text-slate-500 font-medium text-center px-[2rem] lg:px-[0rem]">
					People love what we do and we want to let you know
				</p>

				<div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
					{testinonialsData.map((item) => {
						return (
							<div className="mb-12 md:mb-0 flex items-center flex-col">
								<div
									className={`font-medium text-xl tracking-wide  mb-8 w-[92%] lg:w-[100%] ${item.style}`}
								>
									<p className="text-base lg:text-xl">{`"${item.testimonial}"`}</p>
								</div>
								<Rating name="read-only" value={5} readOnly />
								<h5 className="mt-2 text-lg font-bold">{item.name}</h5>
								<h6 className="mt-0 text-base text-slate-500  dark:text-slate-400">
									{item.designation}
								</h6>
							</div>
						)
					})}
				</div>
			</section>
		</div>
	)
}

export default Testinonials
