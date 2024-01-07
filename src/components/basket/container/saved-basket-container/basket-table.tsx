import { Flex, theme, Typography, Button, Tooltip, Empty } from 'antd'
import { SavedBasket, EditType } from '../../types/types'
import { useBasketStore } from '../../store/basket-store'
import { generateUniqueId } from '../../utils/randomizer'
import { Table } from 'antd'

import {
	DeleteOutlined,
	CopyOutlined,
	FormOutlined,
	ArrowRightOutlined,
} from '@ant-design/icons'

const Index = () => {
	const { token } = theme.useToken()
	const {
		exchange,
		storedBaskets,
		toogleEditModal,
		setEditableBasket,
		deleteStoredBasket,
		createDuplicateStoredBasket,
		moveStoredToRuntimeBasket,
	} = useBasketStore()

	const onHandleBaskeDelete = (id: string) => {
		deleteStoredBasket(id)
	}
	const onHandleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.SAVED)
		toogleEditModal(true)
	}
	const onHandleBasketDuplicate = (id: string) => {
		const basket = storedBaskets.find((basket) => basket.id === id)

		if (basket) {
			const baskets = storedBaskets.filter((b) => b.name === basket.name)
			createDuplicateStoredBasket({
				...basket,
				id: generateUniqueId(),
				identifier: baskets[baskets.length - 1].identifier + 1,
			})
		}
	}
	const onHandleBaskeMove = (id: string) => {
		moveStoredToRuntimeBasket(id)
	}

	const columns = [
		{
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record: SavedBasket) => (
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
			render: (record: SavedBasket) => (
				<Flex justify="flex-end" align="center" key={generateUniqueId()}>
					<Tooltip title="Edit">
						<Button
							size="small"
							icon={<FormOutlined />}
							type="text"
							shape="circle"
							onClick={() => onHandleBasketEdit(record.id)}
						/>
					</Tooltip>
					<Tooltip title="Duplicate">
						<Button
							size="small"
							icon={<CopyOutlined />}
							type="text"
							shape="circle"
							onClick={() => onHandleBasketDuplicate(record.id)}
						/>
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							size="small"
							icon={<DeleteOutlined />}
							type="text"
							shape="circle"
							onClick={() => onHandleBaskeDelete(record.id)}
						/>
					</Tooltip>
					<Tooltip title="Move">
						<Button
							size="small"
							icon={<ArrowRightOutlined />}
							type="text"
							shape="circle"
							onClick={() => onHandleBaskeMove(record.id)}
						/>
					</Tooltip>
				</Flex>
			),
		},
	]

	return (
		<Flex vertical style={{ gap: token.paddingXS }} flex="1">
			{storedBaskets.length > 0 ? (
				<Table
					key={generateUniqueId()}
					dataSource={storedBaskets.filter((b) => b.exchange === exchange)}
					columns={columns}
					pagination={false}
					scroll={{ y: 'calc(100vh - 230px)' }}
				/>
			) : (
				<Flex className="w-full h-[300px]" justify="center" align="center">
					<Empty />
				</Flex>
			)}
		</Flex>
	)
}

export default Index
