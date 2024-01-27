import { Flex, theme, Table, Typography } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import type { ColumnsType } from 'antd/es/table'
import {
	FormOutlined,
	DeleteOutlined,
	CopyOutlined,
	SnippetsOutlined,
} from '@ant-design/icons'
import BasketNav from '../basket-nav'
import EmptyIndicator from '../common/empty-indicator'
import { useBasketStore } from '../../store/basket-store'
import { SavedBasket, EditType } from '../../types/types'
import { checkDuplicate } from '../../utils/duplicate-check'
import { useState } from 'react'
import Actions from '../common/click-actions'
const RuntimeBasket = () => {
	const { token } = theme.useToken()
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
	const {
		runtimeBasketList,
		setRuntimeError,
		selectAllBaskets,
		setEditableBasket,
		updateRuntimeError,
		addToSavedBasket,
		removeSelectedBasket,
		addNewRuntimeBasket,
		deleteRuntimeBasket,
		addBasketToSelectedBaskets,
	} = useBasketStore()

	const handleBasketEdit = (id: string) => {
		setEditableBasket(id, EditType.RUNTIME)
		updateRuntimeError(id)
	}

	const handleBasketDuplicate = (id: string, name: string) => {
		const isDuplicate = checkDuplicate(runtimeBasketList, id, name)
		addNewRuntimeBasket(isDuplicate!)
	}

	const handleBaskeSave = (id: string) => {
		const basket = runtimeBasketList.find((b) => b.id === id)
		if (basket) {
			if (basket.positions && basket.entryCondition) {
				addToSavedBasket(id)
			} else {
				setRuntimeError(id)
			}
		}
	}

	const handleBaskeDelete = (id: string) => {
		deleteRuntimeBasket(id)
	}

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys)
	}
	const rowSelection: TableRowSelection<SavedBasket> = {
		selectedRowKeys,
		onSelect: (record, selected) => {
			if (selected) {
				addBasketToSelectedBaskets(record.id)
			} else {
				removeSelectedBasket(record.id)
			}
		},

		onSelectAll: () => {
			selectAllBaskets()
		},
		onChange: onSelectChange,
	}

	const columns: ColumnsType<SavedBasket> = [
		{
			key: 'name',
			title: (
				<Flex flex={1} justify="flex-start">
					Name
				</Flex>
			),
			render: (record) => (
				<Flex flex="1" justify="flex-start">
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
						{record.name}
						{record.identifier > 0 ? ` - ${record.identifier}` : ''}
					</Typography.Text>
				</Flex>
			),
		},
		{
			key: 'exchange',
			title: (
				<Flex flex={1} justify="flex-end">
					Exchange
				</Flex>
			),
			render: (record) => (
				<Flex flex="1" justify="flex-end">
					<Typography.Text
						style={{
							color: record.error ? token.colorError : token.colorPrimary,
						}}
					>
						{record.exchange}
					</Typography.Text>
				</Flex>
			),
		},
		{
			key: 'instrument',
			title: (
				<Flex flex={1} justify="flex-end">
					Instrument
				</Flex>
			),
			render: (record) => (
				<Flex flex="1" justify="flex-end">
					<Typography.Text
						style={{
							color: record.error ? token.colorError : '#000',
						}}
					>
						{record.ticker}
					</Typography.Text>
				</Flex>
			),
		},
		{
			key: 'actions',
			title: (
				<Flex flex={1} justify="flex-end">
					Actions
				</Flex>
			),
			render: (record) => (
				<Flex gap={'small'} flex={1} justify="flex-end">
					<Actions
						handleButtonClick={handleBasketEdit}
						icon={<FormOutlined />}
						tooltipTitle={'Edit'}
						record={record}
					/>
					<Actions
						handleButtonClick={handleBasketDuplicate}
						icon={<CopyOutlined />}
						tooltipTitle={'Duplicate'}
						record={record}
					/>
					<Actions
						handleButtonClick={handleBaskeSave}
						icon={<SnippetsOutlined />}
						tooltipTitle={'Save'}
						record={record}
					/>
					<Actions
						handleButtonClick={handleBaskeDelete}
						icon={<DeleteOutlined />}
						tooltipTitle={'Delete'}
						record={record}
					/>
				</Flex>
			),
		},
	]

	return (
		<Flex flex="1" vertical>
			<BasketNav setSelectedRowKeys={setSelectedRowKeys} />
			<Table
				rowKey="id"
				columns={columns}
				pagination={false}
				style={{ height: '800px' }}
				rowSelection={rowSelection}
				dataSource={runtimeBasketList}
				scroll={{ y: 'calc(100vh - 165px)' }}
				locale={EmptyIndicator('No Baskets Available')}
			/>
		</Flex>
	)
}

export default RuntimeBasket
