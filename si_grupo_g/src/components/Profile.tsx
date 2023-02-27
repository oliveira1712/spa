import { getProfile, updateGeralProfile } from '@/services/api/profileAPI'
import { Switch } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { string, z } from 'zod'

export type ProfileData = {
	name: string;
	nif: string;
	email: string;
	phoneNumber: string;
	imageUrl: string;
  };
  
  let INITIAL_DATA: ProfileData = {
	name: "",
	nif: "",
	email: "",
	phoneNumber: "",
	imageUrl: "",
  };

const schema = z.object({
	name: string().min(1, { message: 'O nome é inválido' }),
	nif: string().refine((val) => Number(val) && val.length == 9, {
		message: 'Número de Identificação Fiscal não possui 9 digitos',
	}),
	email: string().email({ message: 'O email é inválido' }),
	phoneNumber: string().refine((val) => Number(val) && val.length == 9, {
		message: 'O contacto telefónico não possui 9 digitos',
	}),
})

const user = {
	name: 'Debbie Lewis',
	handle: 'deblewis',
	email: 'debbielewis@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Example() {
	const [availableToHire, setAvailableToHire] = useState(true)
	const [privateAccount, setPrivateAccount] = useState(false)
	const [allowCommenting, setAllowCommenting] = useState(true)
	const [allowMentions, setAllowMentions] = useState(true)

	const { register, handleSubmit, formState, reset } = useForm({
		defaultValues: INITIAL_DATA,
		resolver: zodResolver(schema),
	})

	const [user, setUser] = useState(INITIAL_DATA)
	const fetchUser = async () => {
		const response = await getProfile()
		const data = await response
		setUser(data.data)
	}

	useEffect(() => {
		reset(user)
	}, [user])

	useEffect(() => {
		fetchUser()
	}, [])

	const { errors } = formState

	const handleSave = async (formValues: ProfileData) => {
		console.log(formValues);
		const updateData = {
		  name: formValues.name,
		  nif: formValues.nif,
		  numberPhone: formValues.phoneNumber,
		};
	
		try {
		  await updateGeralProfile(updateData);
		  toast.success("Update efetuado com sucesso");
		} catch (error: any) {
		  toast.error(error.message);
		}
	};

	return (
		<form
			className="divide-y divide-gray-200 lg:col-span-9"
			onSubmit={handleSubmit(handleSave)}
			method="POST"
		>
			<div className="bg-white mx-5 md:mx-12 xl:mx-40 my-12">
				{/* Profile section */}
				<div className="py-6 px-4 sm:p-6 lg:pb-8">
					<div>
						<h2 className="text-lg leading-6 font-medium text-gray-900">Perfil de utilizador</h2>
						<p className="mt-1 text-sm text-gray-500">
							Esta informação é pessoal, cuidado com quem a partilha.
						</p>
					</div>

					<div className="mt-6 flex flex-col lg:flex-row">
						<div className="flex-grow space-y-6">
							<div className="mt-6 grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="name" className="block text-sm font-medium text-gray-700">
										Nome
									</label>
									<input
										type="text"
										{...register('name')}
										id="name"
										autoComplete="given-name"
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
									/>
									<div className="text-red-500">{errors.name?.message}</div>
								</div>

								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="nif" className="block text-sm font-medium text-gray-700">
										NIF
									</label>
									<input
										type="text"
										{...register('nif')}
										id="nif"
										disabled
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm hover:cursor-not-allowed disabled:bg-gray-200"
									/>
									<div className="text-red-500">{errors.nif?.message}</div>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-6 gap-6">
								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<input
										type="text"
										{...register('email')}
										id="email"
										disabled
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm hover:cursor-not-allowed disabled:bg-gray-200"
									/>
									<div className="text-red-500">{errors.email?.message}</div>
								</div>

								<div className="col-span-6 sm:col-span-3">
									<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
										Contacto telefónico
									</label>
									<input
										type="text"
										{...register('phoneNumber')}
										id="phoneNumber"
										className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
									/>
									<div className="text-red-500">{errors.phoneNumber?.message}</div>
								</div>
							</div>
						</div>
						<div className="pt-10 mx-auto flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
							<div className="relative rounded-full overflow-hidden lg:block">
								<Image
									src="/images/avatars/default_avatar.jpg"
									alt="User"
									className="object-cover w-40 h-40 rounded-full"
									width="0"
									height="0"
									sizes="50vw"
								/>

								<label
									htmlFor="desktop-user-photo"
									className="absolute inset-0 w-40 h-40 rounded-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
								>
									<span>Change</span>
									<span className="sr-only"> user photo</span>
									<input
										type="file"
										id="desktop-user-photo"
										name="user-photo"
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Privacy section */}
				<div className="pt-6 divide-y divide-gray-200">
					<div className="px-4 sm:px-6">
						<div>
							<h2 className="text-lg leading-6 font-medium text-gray-900">Privacidade</h2>
							<p className="mt-1 text-sm text-gray-500">
								Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
							</p>
						</div>
						<ul role="list" className="mt-2 divide-y divide-gray-200">
							<Switch.Group as="li" className="py-4 flex items-center justify-between">
								<div className="flex flex-col">
									<Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
										Available to hire
									</Switch.Label>
									<Switch.Description className="text-sm text-gray-500">
										Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
									</Switch.Description>
								</div>
								<Switch
									checked={availableToHire}
									onChange={setAvailableToHire}
									className={classNames(
										availableToHire ? 'bg-blue-500' : 'bg-gray-200',
										'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											availableToHire ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
										)}
									/>
								</Switch>
							</Switch.Group>
							<Switch.Group as="li" className="py-4 flex items-center justify-between">
								<div className="flex flex-col">
									<Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
										Make account private
									</Switch.Label>
									<Switch.Description className="text-sm text-gray-500">
										Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
									</Switch.Description>
								</div>
								<Switch
									checked={privateAccount}
									onChange={setPrivateAccount}
									className={classNames(
										privateAccount ? 'bg-blue-500' : 'bg-gray-200',
										'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											privateAccount ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
										)}
									/>
								</Switch>
							</Switch.Group>
							<Switch.Group as="li" className="py-4 flex items-center justify-between">
								<div className="flex flex-col">
									<Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
										Allow commenting
									</Switch.Label>
									<Switch.Description className="text-sm text-gray-500">
										Integer amet, nunc hendrerit adipiscing nam. Elementum ame
									</Switch.Description>
								</div>
								<Switch
									checked={allowCommenting}
									onChange={setAllowCommenting}
									className={classNames(
										allowCommenting ? 'bg-blue-500' : 'bg-gray-200',
										'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											allowCommenting ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
										)}
									/>
								</Switch>
							</Switch.Group>
							<Switch.Group as="li" className="py-4 flex items-center justify-between">
								<div className="flex flex-col">
									<Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
										Allow mentions
									</Switch.Label>
									<Switch.Description className="text-sm text-gray-500">
										Adipiscing est venenatis enim molestie commodo eu gravid
									</Switch.Description>
								</div>
								<Switch
									checked={allowMentions}
									onChange={setAllowMentions}
									className={classNames(
										allowMentions ? 'bg-blue-500' : 'bg-gray-200',
										'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											allowMentions ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
										)}
									/>
								</Switch>
							</Switch.Group>
						</ul>
					</div>
					<div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
						<button
							type="button"
							className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</form>
	)
}
