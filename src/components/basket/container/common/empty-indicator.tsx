import { Result } from 'antd'

const Empty = (heading: string) => {
	return {
		emptyText: (
			<Result title={heading} subTitle="No Basket have been created yet" />
		),
	}
}

export default Empty
