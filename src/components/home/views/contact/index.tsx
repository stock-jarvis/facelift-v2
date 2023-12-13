import { Flex, Typography, Input, Button } from 'antd'
const index = () => {
	return (
		<Flex gap="large" align="center" className="flex-col">
			<Flex flex={1} align="center" vertical className="pt-20 pb-20">
				<Typography.Title level={1} className="text-center">
					How can we help you ?
				</Typography.Title>
			</Flex>
			<Flex
				className="w-[80%] sm:p-20 border-solid border-[0.5px] rounded-lg shadow-[0_0px_25px_10px_rgba(0,0,0,0.1)] max-sm:flex-col-reverse max-sm:w-[100%] max-sm:p-5"
				gap="middle"
			>
				<Flex flex="1" vertical gap="middle" justify="center">
					<Input size="large" placeholder="email" />
					<Input size="large" placeholder="phone" />
					<Button className="bg-sky-400 text-white" size="large">
						Submit
					</Button>
				</Flex>
				<Flex flex="1" vertical className="max-sm:text-center">
					<Typography.Title level={2}>Query</Typography.Title>
					<Input.TextArea
						style={{ resize: 'none', height: '200px' }}
						maxLength={100}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default index
