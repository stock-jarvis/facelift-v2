import { Flex, Image, Typography } from 'antd'
import BackTest from 'src/assets/images/backtest.png'
import Card from '../../custom/card'
import GuidesDesc from '../../descriptions/guidesDesc'
const { Text, Title } = Typography
import { guides } from '../../../constants/data'

const Index = () => {
	return (
		<Card>
			<Flex flex="1" vertical={false} gap="middle">
				<Flex flex={'1'} vertical={true} gap="middle">
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
							className="border-solid border-b-[2px] border-slate-200 pb-20 pt-5"
						>
							<Title level={2}>{guide.name}</Title>
							<Text>{guide.value}</Text>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Card>
	)
}

export default Index
