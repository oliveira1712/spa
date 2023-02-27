import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
	return (
		<footer className="bg-white shadow-inner" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8 xl:col-span-1">
						<Image
							src="/favicon.ico"
							alt="me"
							className="object-cover h-10 w-10"
							width="0"
							height="0"
							sizes="50vw"
						/>
						<p className="text-gray-500 text-base">
							Transforme o seu negócio com o nosso software de gestão empresarial aumentando a sua
							eficiência e rentabilidade.
						</p>
					</div>
					<div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div></div>
							<div className="mt-12 md:mt-0"></div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
									Suporte
								</h3>
								<ul>
									<li>
										<span className="text-base text-gray-500">sigrupog@gmail.com</span>
									</li>
									<li>
										<span className="text-base text-gray-500">(+351) 255 233 123</span>
									</li>
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">
									Legal
								</h3>
								<ul>
									<li>
										<Link
											href="/terms-and-conditions"
											className="text-base text-gray-500 hover:text-gray-900"
											rel="noopener noreferrer"
											target="_blank"
										>
											Termos e Condições
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-12 border-t border-slate-200 pt-8">
					<p className="text-base text-slate-800 xl:text-center">
						&copy; 2023 SPA. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	)
}
