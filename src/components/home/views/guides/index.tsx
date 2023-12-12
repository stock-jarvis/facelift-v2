import { Flex, Image, Typography } from 'antd'
import BackTest from 'src/assets/images/backtest.png'
import Card from '../../common/card'
import GuidesDesc from '../../container/guides-desc'
const { Text } = Typography
import { guides } from '../../constants/data'

const Index = () => {
	return (
		<Card>
			<Flex flex="1" className="max-sm:flex-col" gap="middle">
				<Flex
					flex={'1'}
					gap="middle"
					className="flex-col max-sm:flex-col-reverse"
				>
					<Flex>
						<Image src={BackTest} alt="Image" preview={false} />
					</Flex>
					<Flex>
						<GuidesDesc />
					</Flex>
				</Flex>
				<Flex flex={'1'} vertical={true} justify="center" gap="middle">
					{guides.map((guide) => (
						<Flex
							key={guide.id}
							vertical={true}
							className="border-solid border-b-[2px] border-slate-200 sm:pb-20 sm:pt-5 max-sm:pb-5 max-sm:pt-1 max-sm:text-center max-sm:last:border-none"
						>
							<Text className="text-2xl font-bold">{guide.name}</Text>
							<Text>{guide.value}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Card>
	)
}

export default Index
