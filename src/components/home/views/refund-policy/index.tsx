import { Flex } from 'antd'
import { refundPolicy } from '../../constants/data'
import CompanyTerms from '../../common/company-terms'
const Index = () => {
	return (
		<Flex>
			<CompanyTerms label="Cancellation/Refund Policy" {...refundPolicy} />
		</Flex>
	)
}

export default Index
