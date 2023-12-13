import { Flex } from 'antd'
import { RefundPolicy } from '../../constants/data'
import CompanyTerms from '../../common/company-terms'
const Index = () => {
	return (
		<Flex>
			<CompanyTerms label="Cancellation/Refund Policy" {...RefundPolicy} />
		</Flex>
	)
}

export default Index
