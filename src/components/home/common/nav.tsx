import { Flex, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
	const navigate = useNavigate()
	return (
		<Flex
			justify="space-between"
			className="fixed left-0 right-0 top-0 z-20  bg-white  shadow-lg select-none"
			align="center"
		>
			<Flex flex={1} justify="space-between" align="center">
				<Flex flex={1} className="justify-end max-sm:justify-center">
					<Typography.Text
						className="text-[2rem] p-[10px] font-bold"
						onClick={() => {
							navigate('/')
						}}
					>
						Stock<span className="text-sky-400">Jarvis</span>
					</Typography.Text>
				</Flex>
				<Flex
					gap="middle"
					flex={1}
					justify="flex-end"
					className="cursor-pointer max-sm:hidden"
				>
					<Typography.Text
						className="text-[1rem] p-[10px] font-bold  hover:underline"
						onClick={() => {
							navigate('/pricing')
						}}
					>
						Pricing
					</Typography.Text>
					<Typography.Text
						className="text-[1rem] p-[10px] font-bold hover:underline"
						onClick={() => {
							navigate('/contact')
						}}
					>
						Contact
					</Typography.Text>
				</Flex>
			</Flex>
			<Flex flex={1} align="center" gap="middle" className="max-sm:hidden">
				<Flex gap="large" flex={2} justify="flex-end">
					<Button size="large" className="font-bold">
						Login
					</Button>
				</Flex>
				<Flex gap="large" flex={1}>
					<Button size="large" className="bg-sky-400 text-[white] font-bold">
						Signup
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Nav
