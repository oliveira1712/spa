import { Loading } from '@/components/Loading'
import MessageChat from '@/models/MessageChat'
import { useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2'

function getScrollPercentage(element: any) {
	if (element === null) {
		return NaN
	}
	const height = element.scrollHeight - element.clientHeight
	return Math.round((element.scrollTop / height) * 100)
}

const CustomerSupportChat = () => {
	const divRef = useRef()

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [scroll, setScroll] = useState<boolean>(false)
	const [newMessage, setNewMessage] = useState('')

	const [messages, setMessages] = useState<MessageChat[]>([
		{ message: 'Em que posso ser útil?', isMyMessage: false },
	])

	const sendMessage = async () => {
		if (newMessage.length < 3) {
			return
		}
		setIsLoading(true)

		const position = getScrollPercentage(divRef.current as any)
		setScroll(position == 100 || isNaN(position))

		setMessages([
			...messages,
			{
				message: newMessage,
				isMyMessage: true,
			},
			{
				message:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id congue.',
				isMyMessage: false,
			},
		])
		setNewMessage('')

		setIsLoading(false)
	}

	useEffect(() => {
		if (getScrollPercentage(divRef.current as any) != 100 && scroll) {
			const ref = divRef.current as any
			ref.scrollTo(0, ref.scrollHeight)
			setScroll(false)
		}
	})

	return (
		<>
			<button
				className="fixed bottom-0 right-0 p-4 m-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 z-50"
				onClick={() => setIsVisible(!isVisible)}
			>
				<HiOutlineChatBubbleBottomCenterText size={30} />
			</button>
			<div
				style={{ height: isVisible ? 'auto' : 'null' }}
				className={`fixed bottom-16 right-2 p-4 transition-all duration-500 ${
					isVisible ? 'opacity-100' : 'opacity-0 hidden'
				}`}
			>
				<div className="bg-white rounded-lg max-w-md shadow-lg py-4 w-[90vw] sm:w-[60vw] min-h-[15vh] ">
					<div className="overflow-auto max-h-[60vh]" ref={divRef}>
						{messages.map((message, index) => (
							<div key={index}>
								{message.isMyMessage ? (
									<div className="flex py-4 pr-4 pl-10 justify-end">
										<div className="bg-gray-200 rounded-lg p-3 overflow-y-auto">
											<h1 className="text-gray-700">{message.message}</h1>
										</div>
									</div>
								) : (
									<div className="flex py-4 pl-4 pr-10">
										<div className="relative min-w-[3rem] h-12 overflow-hidden bg-gray-100 rounded-full mr-2">
											<svg
												className="absolute w-14 h-14 text-gray-400 -left-1"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clipRule="evenodd"
												></path>
											</svg>
										</div>

										<div className="bg-blue-500 rounded-lg p-3 overflow-y-auto">
											<h1 className="text-gray-100">{message.message}</h1>
										</div>
									</div>
								)}
							</div>
						))}

						{isLoading && (
							<div className="flex py-4 pr-4 pl-10 justify-start">
								<Loading />
							</div>
						)}
					</div>

					<div className="flex justify-between p-4">
						<div className="flex w-full space-x-2">
							<input
								type="text"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg transition-all duration-300 outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
								placeholder="Escreva aqui a sua mensagem..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
							/>
							<button
								className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
								onClick={sendMessage}
							>
								<BiSend size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CustomerSupportChat
