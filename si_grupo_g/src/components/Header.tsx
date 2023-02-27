import { Menu, Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useContext } from 'react'

import Container from '@/components/Container'
import { AuthContext } from '@/contexts/AuthContext'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { ButtonLink } from './Button'

function MobileNavigation({ isAuthenticated, signOut }: any) {
	return (
		<Popover>
			{({ open, close }) => (
				<>
					<Popover.Button className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none">
						<span className="sr-only">Toggle Navigation</span>
						<svg
							aria-hidden="true"
							className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
							fill="none"
							strokeWidth={2}
							strokeLinecap="round"
						>
							<path
								d="M0 1H14M0 7H14M0 13H14"
								className={clsx('origin-center transition', {
									'scale-90 opacity-0': open,
								})}
							/>
							<path
								d="M2 2L12 12M12 2L2 12"
								className={clsx('origin-center transition', {
									'scale-90 opacity-0': !open,
								})}
							/>
						</svg>
					</Popover.Button>
					<Transition.Root>
						<Transition.Child
							as={Fragment}
							enter="duration-150 ease-out"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="duration-150 ease-in"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="duration-150 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-100 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Popover.Panel
								as="ul"
								className="absolute inset-x-0 top-full mt-4 origin-top space-y-4 rounded-2xl bg-white p-6 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
							>
								<li>
									<Link href="#pricing">
										<span className="block w-full" onClick={() => close()}>
											Planos
										</span>
									</Link>
								</li>
								<li>
									<Link href="#features">
										<span className="block w-full" onClick={() => close()}>
											Serviços
										</span>
									</Link>
								</li>
								<li>
									<Link href="#testimonials">
										<span className="block w-full" onClick={() => close()}>
											Reviews
										</span>
									</Link>
								</li>
								<li>
									<Link href="#Faqs">
										<span className="block w-full" onClick={() => close()}>
											FAQ
										</span>
									</Link>
								</li>

								{isAuthenticated ? (
									<ProfileDropdown signOut={signOut} />
								) : (
									<>
										<li className="border-t border-slate-300/40 pt-4">
											<Link href="/login">
												<span className="block w-full">Iniciar Sessão</span>
											</Link>
										</li>
										<li>
											<ButtonLink href="/register" className="w-full">
												<span>
													Comece já<span className="hidden lg:inline"> hoje</span>
												</span>
											</ButtonLink>
										</li>
									</>
								)}
							</Popover.Panel>
						</Transition.Child>
					</Transition.Root>
				</>
			)}
		</Popover>
	)
}

export function Header() {
	const scrollPosition = useScrollPosition()
	const { isAuthenticated, signOut } = useContext(AuthContext)

	return (
		<header
			className={clsx(
				'py-5 sticky  top-0 bg-white transition-shadow backdrop-filter backdrop-blur-lg bg-opacity-60 z-50',
				{
					shadow: scrollPosition > 0,
				}
			)}
		>
			<Container>
				<nav className="relative z-50 text-sm">
					<ul className="flex items-center">
						<li>
							<Link href="/#Hero" scroll={false}>
								<span>
									<span className="sr-only">Home</span>
									<Image
										src="/favicon.ico"
										alt="me"
										className="object-cover h-14 w-14"
										width="0"
										height="0"
										sizes="50vw"
									/>
								</span>
							</Link>
						</li>
						<li className="ml-6 hidden md:block">
							<Link href="/#pricing" scroll={false}>
								<span className="text-base font-semibold py-1 px-2 text-slate-700 hover:text-blue-600">
									Planos
								</span>
							</Link>
						</li>
						<li className="ml-6 hidden md:block">
							<Link href="/#features" scroll={false}>
								<span className="text-base font-semibold py-1 px-2 text-slate-700 hover:text-blue-600">
									Serviços
								</span>
							</Link>
						</li>
						<li className="ml-6 hidden md:block">
							<Link href="/#testimonials" scroll={false}>
								<span className="text-base font-semibold py-1 px-2 text-slate-700 hover:text-blue-600">
									Reviews
								</span>
							</Link>
						</li>
						<li className="ml-6 hidden md:block">
							<Link href="/#Faqs" scroll={false}>
								<span className="text-base font-semibold py-1 px-2 text-slate-700 hover:text-blue-600">
									FAQ
								</span>
							</Link>
						</li>

						{isAuthenticated ? (
							<li className="ml-auto hidden md:block">
								<ProfileDropdown signOut={signOut} />
							</li>
						) : (
							<>
								<li className="ml-auto hidden md:block">
									<Link href="/login">
										<span className="text-base font-semibold py-1 px-2 text-slate-700 hover:text-blue-600">
											Iniciar Sessão
										</span>
									</Link>
								</li>
								<li className="hidden md:block ml-auto md:ml-8">
									<ButtonLink href="/register">
										<span>
											Comece já<span className="hidden lg:inline"> hoje</span>
										</span>
									</ButtonLink>
								</li>
							</>
						)}

						<li className="ml-auto md:hidden">
							<MobileNavigation isAuthenticated={isAuthenticated} signOut={signOut} />
						</li>
					</ul>
				</nav>
			</Container>
		</header>
	)
}

function ProfileDropdown({ signOut }: any) {
	return (
		<>
			{/* Profile dropdown */}
			<Menu as="div" className="relative sm:ml-3">
				<div>
					<Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-gray-200">
						<span className="sr-only">Open user menu</span>
						<Image
							src="/images/avatars/default_avatar.jpg"
							alt="User"
							className="object-cover h-10 w-10 rounded-full"
							width="0"
							height="0"
							sizes="50vw"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="sm:absolute sm:right-0 z-10 mt-2 w-full sm:w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<Menu.Item>
							{({ active }) => (
								<Link
									href="/profile"
									className={clsx(
										active ? 'bg-gray-100' : '',
										'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
									)}
								>
									Perfil
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={signOut}
									className={clsx(
										active ? 'bg-gray-100' : '',
										'w-full text-left block px-4 py-2 text-sm text-gray-700'
									)}
								>
									Sign out
								</button>
							)}
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	)
}
