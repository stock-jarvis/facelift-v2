import { Button, ButtonProps, Flex, Space } from 'antd'

import './styles/styles.css'
import { useRef } from 'react'

export type ButtonCarouselProps = {
	items: string[]
	selected?: string
	onClick: (item: string) => void
}

const ButtonCarousel: React.FC<ButtonCarouselProps> = ({
	items,
	selected,
	onClick,
}) => {
	const buttonContainerRef = useRef<HTMLDivElement>(null)

	const handleClick: ButtonProps['onClick'] = (event) => {
		const item = event.currentTarget.dataset.item!
		event.currentTarget.scrollIntoView()
		onClick(item)
	}

	const handleScrollRight: ButtonProps['onClick'] = () => {
		const scrollLeft = buttonContainerRef.current?.scrollLeft

		if (scrollLeft !== undefined) {
			buttonContainerRef.current!.scrollLeft = scrollLeft + 200
		}
	}

	const handleScrollLeft: ButtonProps['onClick'] = () => {
		const scrollLeft = buttonContainerRef.current?.scrollLeft

		if (scrollLeft !== undefined) {
			buttonContainerRef.current!.scrollLeft = scrollLeft - 200
		}
	}

	return (
		<Flex justify="space-between">
			<Button onClick={handleScrollLeft} style={{ marginRight: '8px' }}>
				&lt;
			</Button>
			<Space
				ref={buttonContainerRef}
				className="button-carousel-container"
				style={{ padding: '0 4px', paddingBottom: '8px' }}
			>
				{items.map((item) => (
					<Button
						key={item}
						type={item === selected ? 'primary' : 'default'}
						onClick={handleClick}
						data-item={item}
					>
						{item}
					</Button>
				))}
			</Space>
			<Button onClick={handleScrollRight} style={{ marginLeft: '8px' }}>
				&gt;
			</Button>
		</Flex>
	)
}

export default ButtonCarousel
