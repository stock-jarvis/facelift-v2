import { Flex, Typography } from 'antd'
import { companyData, companyTerms, socialMedia } from '../../../constants/data'
import List from '../../custom/list'
const Index = () => {
	return (
		<Flex flex={1} vertical className="p-10 bg-black" gap="middle">
			<Flex flex={1} className="p-20" justify="space-between">
				<Flex flex={1} justify="center" align="center">
					<Typography.Text className="text-[2.5rem] text-white">
						StockJarvis
					</Typography.Text>
				</Flex>
				<Flex flex={1} justify="center">
					<List data={companyData} />
				</Flex>
				<Flex flex={1} justify="center">
					<List data={socialMedia} />
				</Flex>
				<Flex flex={1} justify="center">
					<List data={companyTerms} />
				</Flex>
			</Flex>
			<Flex flex={1} justify="center">
				<Typography.Text className="text-[1rem] text-white">
					2023 @ StockJarvis All rights reserved.
				</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default Index
