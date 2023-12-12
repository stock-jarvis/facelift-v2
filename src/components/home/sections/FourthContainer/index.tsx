import React from 'react'
import Button from '@mui/material/Button'
import Image from 'next/image'
import costSaving from '../../../../public/images/simulator-image3.png'
import Link from 'next/link'

export default function FourthContainer() {
	return (
		<div className="grid grid-cols-12 place-items-center px-[0rem] py-[0rem] lg:px-[12rem] lg:py-[5rem] h-[70px] w-full h-[90vh] my-[3rem] lg:my-[0rem]">
			<div className="col-span-12 lg:col-span-6 px-[2rem] lg:px-[0rem] pt-[1rem] lg:pt-[0rem]">
				<p className="text-sm lg:text-base text-slate-500 font-medium mb-[.5rem] tracking-wider">
					COSTSAVER
				</p>
				<div className="text-[2.5rem] lg:text-[2rem] font-medium">
					<p className="">Cost saving in a</p>
					<p>smart way</p>
				</div>
				<div className="text-base lg:text-base text-slate-500 font-normal mt-[2rem] lg:mt-[1rem]">
					<p className="">
						Powerful tool that helps you reduce costs and save money on{' '}
					</p>
					<p className="">
						your business operations. With advanced analytics and
					</p>
					<p className="">
						optimization algorithms, Costsaver analyzes your existing{' '}
					</p>
					<p className="">workflows and identifies areas for improvement.</p>
				</div>
				<div className="mt-[1.5rem]">
					<Link href={'/signup'}>
						<Button
							variant="outlined"
							sx={{ textTransform: 'none' }}
							className="bg-slate-100 text-slate-700 text-sm lg:text-lg hover:bg-slate-200 py-[.5rem] lg:py-[.7rem] px-[1rem] lg:px-[1.5rem] border border-slate-600 hover:border-slate-700 rounded-lg"
						>
							Try now
						</Button>
					</Link>
				</div>
			</div>

			<div className="col-span-12 lg:col-span-6 ">
				<div className="">
					<Image
						src={costSaving.src}
						alt="TradingView"
						width={400}
						height={400}
						objectFit="contain"
						className="p-[4rem] lg:p-[0rem]"
					/>
				</div>
			</div>
		</div>
	)
}
