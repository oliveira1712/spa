/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Transition } from "@headlessui/react"
import { HiChevronDown } from "react-icons/hi2"

const faqs = [
	{
		question: "O que é um software de gestão empresarial?",
		answer:
			"Um software de gestão empresarial é um conjunto de ferramentas e aplicativos que ajudam a gerir e automatizar processos administrativos e operacionais de uma empresa.",
	},
	{
		question: "Quais são os benefícios de usar um software de gestão empresarial?",
		answer:
			"Alguns benefícios incluem melhoria da eficiência, redução de erros, automatização de tarefas repetitivas, melhor tomada de decisão com base em dados precisos e acesso fácil a informações críticas.",
	},
	{
		question: "Como escolher o melhor software de gestão empresarial para a minha empresa?",
		answer:
			"É importante avaliar as necessidades da sua empresa e comparar as funcionalidades e recursos oferecidos por diferentes softwares antes de tomar a decisão.",
	},
	{
		question:
			"O software de gestão empresarial pode ser personalizado para atender às necessidades específicas da minha empresa?",
		answer:
			"Depende do software, mas alguns oferecem opções de personalização para atender às necessidades específicas do negócio.",
	},
	{
		question: "O software de gestão empresarial oferece suporte para múltiplos idiomas?",
		answer:
			" Depende do software, mas alguns oferecem suporte para múltiplos idiomas, permitindo que a empresa atenda a clientes internacionais.",
	},
	{
		question:
			"O software de gestão empresarial oferece funcionalidades para gerenciamento de estoque e inventário?",
		answer:
			"Depende do software, mas muitos oferecem funcionalidades para gerenciamento de estoque e inventário.",
	},
	/*    {
    question:
      "O software de gestão empresarial oferece suporte para múltiplos idiomas?",
    answer:
      "Depende do software, mas alguns oferecem suporte para múltiplos idiomas, permitindo que a empresa atenda a clientes internacionais.",
  },
  {
    question:
      "O software de gestão empresarial oferece relatórios financeiros e de desempenho?",
    answer:
      "Depende do software, mas muitos oferecem relatórios financeiros e de desempenho para auxiliar na tomada de decisões.",
  },
  {
    question: "O software de gestão empresarial pode ser acessado remotamente?",
    answer:
      "Depende do software, mas alguns oferecem acesso remoto para acessar as informações e funcionalidades do sistema de qualquer lugar.",
  },
  {
    question:
      "O software de gestão empresarial oferece integração com outros sistemas da minha empresa?",
    answer:
      "Depende do software, mas muitos oferecem integração com outros sistemas, como contabilidade, CRM e ERP.",
  },
  {
    question: "O software de gestão empresarial oferece suporte técnico?",
    answer:
      "Depende do software, mas muitos oferecem suporte técnico para ajudar os usuários a solucionar problemas e responder perguntas.",
  },*/
]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

export default function Faqs() {
	return (
		<div
			id="Faqs"
			className="min-h-[80vh] max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 flex items-center "
		>
			<div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
				<h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
					Perguntas Frequentes
				</h2>
				<dl className="mt-6 space-y-6 divide-y divide-gray-200">
					{faqs.map((faq) => (
						<Disclosure as="div" key={faq.question} className="pt-6">
							{({ open }) => (
								<>
									<dt className="text-lg">
										<Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
											<span className="font-medium text-gray-900">{faq.question}</span>
											<span className="ml-6 h-7 flex items-center">
												<HiChevronDown
													className={classNames(
														open ? "-rotate-180" : "rotate-0",
														"h-6 w-6 transform transition transition-fast duration-500"
													)}
													aria-hidden="true"
												/>
											</span>
										</Disclosure.Button>
										<Transition
											enter="transition ease duration-500 transform"
											enterFrom="opacity-0 -translate-y-6"
											enterTo="opacity-100 translate-y-0"
											leave="transition ease duration-300 transform"
											leaveFrom="opacity-100 translate-y-0"
											leaveTo="opacity-0 -translate-y-6"
										>
											<Disclosure.Panel as="dd" className="mt-2 pr-12">
												<p className="text-base text-gray-500">{faq.answer}</p>
											</Disclosure.Panel>
										</Transition>
									</dt>
								</>
							)}
						</Disclosure>
					))}
				</dl>
			</div>
		</div>
	)
}
