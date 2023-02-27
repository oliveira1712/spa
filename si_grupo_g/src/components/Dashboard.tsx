import { useState } from 'react'
import { HiCreditCard, HiUser } from 'react-icons/hi2'
import LicenseManager from './LicenseManager'
import Profile from './Profile'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

const tabs = [
	{ name: 'Geral', index: 0, icon: HiUser, current: true },
	{ name: 'Gestão de licença', index: 1, icon: HiCreditCard, current: false },
]

export default function Dashboard() {
	const [currentTab, setCurrentTab] = useState(0)

	return (
		<div className="shadow-md mx-5 md:mx-20 lg:mx-52 my-12 rounded-md">
			<div className="lg:hidden">
				<label htmlFor="selected-tab" className="sr-only">
					Select a tab
				</label>
				<select
					id="selected-tab"
					name="selected-tab"
					onChange={(event) => setCurrentTab(Number(event.target.value))}
					className="mt-1 block w-full mx-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
				>
					{tabs.map((tab, index) => (
						<option key={tab.name} value={index}>
							{tab.name}
						</option>
					))}
				</select>
			</div>
			<div className="hidden lg:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8 ml-6">
						{tabs.map((tab, index) => (
							<button
								key={tab.name}
								onClick={() => setCurrentTab(index)}
								className={classNames(
									currentTab == index
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
									'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
								)}
							>
								<div className="inline-flex items-center">
									<tab.icon className="mr-2" />
									{tab.name}
								</div>
							</button>
						))}
					</nav>
				</div>
			</div>
			<div>
				{currentTab == 0 && <Profile />}
				{currentTab == 1 && <LicenseManager />}
			</div>
		</div>
	)
}
