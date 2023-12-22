import { Flex, theme, Typography, Button } from 'antd'
import { SavedBasketsObject } from '../../types/types'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../common/utils/randomizer'
import { Table } from 'antd'

import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons'

const Index = () => {
	const { token } = theme.useToken()
	const { storedBaskets, addToStoredBaskets, deleteStoredBasket, exchange } =
		useBasketStore()

	const onHandleBaskeDelete = (id: string) => {
		deleteStoredBasket(id)
	}
	const onHandleBasketEdit = (id: string) => {
		console.log(id)
	}
	const onHandleBasketDuplicate = (id: string) => {
		const existingBasket = storedBaskets.find((basket) => basket.id === id)
		existingBasket &&
			addToStoredBaskets({ ...existingBasket, id: generateUniqueId() })
	}
	const onHandleBaskeMove = (id: string) => {
		console.log('move', id)
	}

	const columns = [
		{
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record: SavedBasketsObject) => (
				<Flex flex="1" justify="flex-start" key={generateUniqueId()}>
					<Typography.Text>
						{record.name}
						{record.identifier > 0 ? ` - ${record.identifier}` : ''}
					</Typography.Text>
				</Flex>
			),
			key: generateUniqueId(),
		},
		{
			title: <Flex justify="flex-end">Actions</Flex>,
			key: generateUniqueId(),
			render: (record: SavedBasketsObject) => (
				<Flex justify="flex-end" align="center" key={generateUniqueId()}>
					<Button
						size="small"
						icon={<FormOutlined />}
						type="text"
						shape="circle"
						onClick={() => onHandleBasketEdit(record.id)}
					/>
					<Button
						size="small"
						icon={<CopyOutlined />}
						type="text"
						shape="circle"
						onClick={() => onHandleBasketDuplicate(record.id)}
					/>
					<Button
						size="small"
						icon={<DeleteOutlined />}
						type="text"
						shape="circle"
						onClick={() => onHandleBaskeDelete(record.id)}
					/>
					<Button
						size="small"
						icon={<ArrowRightOutlined />}
						type="text"
						shape="circle"
						onClick={() => onHandleBaskeMove(record.id)}
					/>
				</Flex>
			),
		},
	]

	return (
		<Flex vertical style={{ gap: token.paddingXS }}>
			<Table
				key={generateUniqueId()}
				dataSource={storedBaskets.filter((b) => b.exchange === exchange)}
				columns={columns}
				pagination={false}
				scroll={{ y: 'calc(100vh - 305px)' }}
			/>
		</Flex>
	)
}

export default Index
