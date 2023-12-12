import { Suspense, lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import HomePage from 'src/components/home/sections/views/homePage'
import Pricing from 'src/components/home/sections/views/pricing'
import Contact from 'src/components/home/sections/views/contact'
const Home = lazy(() => import('src/components/home'))
const Simulator = lazy(() => import('src/components/simulator'))

// TODO: Add loading spinners
const routes: RouteObject[] = [
	{
		path: '/',
		element: (
			<Suspense fallback={<div>Loader</div>}>
				<Home />
			</Suspense>
		),
		children: [
			{ path: '/', element: <HomePage /> },
			{ path: '/pricing', element: <Pricing /> },
			{ path: '/contact', element: <Contact /> },
		],
	},
	{
		path: '/simulator',
		element: (
			<Suspense fallback={<div>Loader</div>}>
				<Simulator />
			</Suspense>
		),
	},
]

export default routes
