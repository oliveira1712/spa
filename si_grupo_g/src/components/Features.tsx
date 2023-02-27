import {
	HiOutlinePresentationChartLine as AnalisisIcon,
	HiOutlineCog8Tooth as AutomationIcon,
	HiOutlineUserGroup as InterfaceIcon,
	HiOutlineClipboardDocumentList as ManagementIcon,
} from "react-icons/hi2"

const features = [
	{
		name: "Interface fácil de utilizar",
		description:
			"Um software de gestão que é fácil de navegar e compreender pode melhorar significativamente a eficiência das operações da empresa.",
		icon: InterfaceIcon,
	},
	{
		name: "Automatização de tarefas repetitivas",
		description:
			"Automatizar tarefas repetitivas como entrada de dados e marcação de horários pode poupar tempo aos funcionários e reduzir o potencial de erros.",
		icon: AutomationIcon,
	},
	{
		name: "Análise de dados em tempo real",
		description:
			"Um software que permite uma análise de dados em tempo real pode ajudar a empresa a tomar decisões informadas rapidamente e eficientemente.",
		icon: AnalisisIcon,
	},
	{
		name: "Gestão financeira",
		description:
			"Um software com ferramentas de contabilidade que ajuda a gerir de forma mais eficiente, acompanhar o progresso, identificar problemas e tomar decisões informadas.",
		icon: ManagementIcon,
	},
]

export default function Features() {
	return (
		<div id="features" className="min-h-[80vh] py-24 flex items-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					{/*           <h2 className="text-xl font-semibold leading-8 text-blue-600">
            Características
          </h2> */}
					<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Os nossos serviços
					</p>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
						Opte pelo nosso software de gestão de empresas para aumentar a eficiência da sua empresa
						com automação de processos e análise de dados em tempo real
					</p>
				</div>

				<div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
					<dl className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative">
								<dt>
									<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
										<feature.icon className="h-8 w-8" aria-hidden="true" />
									</div>
									<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
										{feature.name}
									</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}
