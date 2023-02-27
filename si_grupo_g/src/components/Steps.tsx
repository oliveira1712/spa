import { HiOutlineCheck as CheckIcon } from 'react-icons/hi'

// complete,    current,     upcoming
let steps = [
	{ id: '01', name: 'Detalhes pessoais', href: '#', status: 'complete' },
	{ id: '02', name: 'Detalhes cartão', href: '#', status: 'current' },
	{ id: '03', name: 'Escolha o seu plano ', href: '#', status: 'upcoming' },
]

type StepsProps = {
	currentStep: number
}

export default function Steps({ currentStep }: StepsProps) {
	return (
		<nav aria-label="Progress">
			<ol
				role="list"
				className="border border-gray-300 rounded-t-md divide-y divide-gray-300 md:flex md:divide-y-0"
			>
				{steps.map((step, stepIdx) => (
					<li key={step.name} className="relative md:flex-1 md:flex">
						{Number(step.id) < currentStep + 1 ? (
							<a href={step.href} className="group flex items-center w-full cursor-default">
								<span className="px-6 py-4 flex items-center text-sm font-medium">
									<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
										<CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
									</span>
									<span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
								</span>
							</a>
						) : Number(step.id) === currentStep + 1 ? (
							<a
								href={step.href}
								className="px-6 py-4 flex items-center text-sm font-medium cursor-default"
								aria-current="step"
							>
								<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
									<span className="text-blue-600">{step.id}</span>
								</span>
								<span className="ml-4 text-sm font-medium text-blue-600">{step.name}</span>
							</a>
						) : (
							<a href={step.href} className="group flex items-center cursor-default">
								<span className="px-6 py-4 flex items-center text-sm font-medium">
									<span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
										<span className="text-gray-500">{step.id}</span>
									</span>
									<span className="ml-4 text-sm font-medium text-gray-500">{step.name}</span>
								</span>
							</a>
						)}

						{stepIdx !== steps.length - 1 ? (
							<>
								<div
									className="hidden md:block absolute top-0 right-0 h-full w-5"
									aria-hidden="true"
								>
									<svg
										className="h-full w-full text-gray-300"
										viewBox="0 0 22 80"
										fill="none"
										preserveAspectRatio="none"
									>
										<path
											d="M0 -2L20 40L0 82"
											vectorEffect="non-scaling-stroke"
											stroke="currentcolor"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</>
						) : null}
					</li>
				))}
			</ol>
		</nav>
	)
}
