import { Flex, theme, Table, Typography, notification } from 'antd'
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
import { useEffect, useState } from 'react'
import Actions from '../common/click-actions'
import { GetBasketAPI } from '../../../../api/AuthService'
const RuntimeBasket = () => {
	const { token } = theme.useToken()
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
	const {
		runtimeBasketList,
		setRuntimeError,
		selectAllBaskets,
		selectedBaskets,
		setEditableBasket,
		updateRuntimeError,
		addToSavedBasket,
		removeSelectedBasket,
		addNewRuntimeBasket,
		deleteRuntimeBasket,
		addBasketToSelectedBaskets,
		// basketData,
		setBasketData,
		setNewState,
	} = useBasketStore()

	// console.log(runtimeBasketList)
	const newData = runtimeBasketList.map((item, id) => ({
		Exch: item.exchange,
		Inst: item.ticker,
		LastUpdated: Date.now(),
		Name: item.name,
		Status: 'NEXEC',
	}))

	const handleBasketEdit = (id: string) => {
		// console.log(name)
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
		// console.log({newSelectedRowKeys})
		setSelectedRowKeys(newSelectedRowKeys)
	}
	const rowSelection: TableRowSelection<SavedBasket> = {
		selectedRowKeys,
		onSelect: (record, selected) => {
			// console.log({selected,record})
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

	useEffect(() => {
		fetchData()
	}, [])

	const [instrument, setInstrument] = useState([])
	const combinedData = [...newData, ...instrument].map((com, idx) => {
		return { ...com, id: idx.toString() }
	})
	const fetchData = async () => {
		try {
			const response = await GetBasketAPI()
			setInstrument(response.Baskets)
			setNewState(combinedData)
		} catch (error) {
			notification.success({ message: 'Error While login' })
		}
	}

	useEffect(() => {
		const combinedData = [...newData, ...instrument]
		setNewState(combinedData)
	}, [instrument])

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
						{record.Name}
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
						{record.Exch}
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
						{record.Inst}
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
						handleButtonClick={() => handleBasketEdit(record.Name)}
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
				// dataSource={instrument}
				// dataSource={runtimeBasketList}
				dataSource={combinedData}
				scroll={{ y: 'calc(100vh - 165px)' }}
				locale={EmptyIndicator('No Baskets Available')}
			/>
		</Flex>
	)
}

export default RuntimeBasket
