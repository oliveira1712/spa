
import { RadioGroup, Switch } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiCreditCard } from "react-icons/hi2";
import { string, z } from "zod";

type LicenseManagerData = {
  name: string;
  cardNumber: string;
  receiptAddress: string;
  expirationDate: string;
  cvc: string;
};

const INITIAL_DATA: LicenseManagerData = {
  name: "",
  cardNumber: "",
  receiptAddress: "",
  expirationDate: "",
  cvc: "",
};

const stringRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const addressRegex = /^([A-ZÀ-Úa-zà-ú'’][\w\sà-úÀ-Ú']{0,}[,]?[-]?)+$/;
const schema = z.object({
  name: string().min(1, { message: "O nome é inválido" }),
  cardNumber: string().refine((val) => Number(val) && val.length == 16, {
    message: "Número do cartão de crédito não possui 16 digitos",
  }),
  receiptAddress: string().regex(addressRegex, { message: "A morada de faturação é inválida" }),
  expirationDate: string().regex(stringRegex, { message: "Data de expiração inválida" }),
  cvc: string().refine((val) => Number(val) && val.length == 3, {
    message: "CVC não possui 3 digitos",
  }),
});

const plans = [
	{
		id: 'STARTUP',
		name: 'Startup',
		priceMonthly: 9,
		priceYearly: 97.2,
		limit: 'Até 2 contas bancárias',
	},
	{
		id: 'BUSINESS',
		name: 'Business',
		priceMonthly: 15,
		priceYearly: 162,
		limit: 'Até 5 contas bancárias',
	},
	{
		id: 'ENTERPRISE',
		name: 'Enterprise',
		priceMonthly: 39,
		priceYearly: 421.2,
		limit: 'Até 12 contas bancárias',
	},
];

const payments = [
  {
    id: 1,
    date: "1/2/2022",
    description: "Business Plan - Pagamento mensal",
    amount: "15.00€",
    status: "Em preparação",
    href: "#",
  },
  {
    id: 2,
    date: "1/1/2022",
    description: "Business Plan - Pagamento mensal",
    amount: "15.00€",
    status: "Em atraso",
    href: "#",
  },
  {
    id: 3,
    date: "1/1/2020",
    description: "Business Plan - Pagamento mensal",
    amount: "15.00€",
    status: "Pago",
    href: "#",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LicenseManager() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: INITIAL_DATA,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleSave = (formValues: LicenseManagerData) => {
    console.log(formValues);
  };

  return (
    <>
      <div className="h-full mt-12 lg:mt-0">
        <main className="max-w-7xl mx-auto pb-10 lg:py-12 xl:px-8">
          <div className="lg:grid lg:grid-cols-10 lg:gap-x-5 px-6 lg:px-12">
            {/* Payment details */}
            <div className="space-y-6  lg:col-span-10">
              <section aria-labelledby="payment-details-heading">
                <form onSubmit={handleSubmit(handleSave)} method="POST">
                  <div className="shadow-lg rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                      <div>
                        <h2
                          id="payment-details-heading"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Detalhes de pagamento
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Atualiza os teus dados de pagamento. Por favor tem em atenção que a
                          alteração da tua localização pode afetar as taxas de pagamento.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-6">
                        <div className="col-span-4 sm:col-span-2">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nome
                          </label>
                          <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                          <div className="text-red-500">{errors.name?.message}</div>
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="cardNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número do cartão
                          </label>
                          <input
                            type="text"
                            {...register("cardNumber")}
                            id="cardNumber"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                          <div className="text-red-500">{errors.cardNumber?.message}</div>
                        </div>

                        <div className="col-span-4 sm:col-span-2">
                          <label
                            htmlFor="receiptAddress"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Morada de faturação
                          </label>
                          <input
                            type="text"
                            {...register("receiptAddress")}
                            id="receiptAddress"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                          <div className="text-red-500">{errors.receiptAddress?.message}</div>
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="expirationDate"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Data de expiração
                          </label>
                          <input
                            type="text"
                            {...register("expirationDate")}
                            id="expirationDate"
                            autoComplete="cc-exp"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                            placeholder="MM / YY"
                          />
                          <div className="text-red-500">{errors.expirationDate?.message}</div>
                        </div>

                        <div className="col-span-4 sm:col-span-1">
                          <label
                            htmlFor="cvc"
                            className="flex items-center text-sm font-medium text-gray-700"
                          >
                            <span>CVC</span>
                            <HiCreditCard
                              className="ml-1 flex-shrink-0 h-5 w-5 text-gray-300"
                              aria-hidden="true"
                            />
                          </label>
                          <input
                            type="text"
                            {...register("cvc")}
                            id="cvc"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          />
                          <div className="text-red-500">{errors.cvc?.message}</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </section>

              {/* Plan */}
              <section aria-labelledby="plan-heading">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                      <div>
                        <h2
                          id="plan-heading"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Plano
                        </h2>
                      </div>

                      <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                        <RadioGroup.Label className="sr-only">Pricing plans</RadioGroup.Label>
                        <div className="relative bg-white rounded-md -space-y-px ">
                          {plans.map((plan, planIdx) => (
                            <RadioGroup.Option
                              key={plan.name}
                              value={plan}
                              className={({ checked }) =>
                                classNames(
                                  planIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                                  planIdx === plans.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                                  checked
                                    ? "bg-blue-50 border-blue-200 z-10 focus:ring-0 focus:ring-offset-0"
                                    : "border-gray-200",
                                  "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <div className="flex items-center text-sm">
                                    <span
                                      className={classNames(
                                        checked
                                          ? "bg-blue-500 border-transparent"
                                          : "bg-white border-gray-300",
                                        "h-4 w-4 rounded-full border flex items-center justify-center"
                                      )}
                                      aria-hidden="true"
                                    >
                                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                                    </span>
                                    <RadioGroup.Label
                                      as="span"
                                      className="ml-3 font-medium text-gray-900"
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                  </div>
                                  <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                                    <span
                                      className={classNames(
                                        checked ? "text-blue-900" : "text-gray-900",
                                        "font-medium"
                                      )}
                                    >
                                      ${plan.priceMonthly} / mo
                                    </span>{" "}
                                    <span className={checked ? "text-blue-700" : "text-gray-500"}>
                                      (${plan.priceYearly} / yr)
                                    </span>
                                  </RadioGroup.Description>
                                  <RadioGroup.Description
                                    className={classNames(
                                      checked ? "text-blue-700" : "text-gray-500",
                                      "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                    )}
                                  >
                                    {plan.limit}
                                  </RadioGroup.Description>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>

                      <Switch.Group as="div" className="flex items-center">
                        <Switch
                          checked={annualBillingEnabled}
                          onChange={setAnnualBillingEnabled}
                          className={classNames(
                            annualBillingEnabled ? "bg-blue-500" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              annualBillingEnabled ? "translate-x-5" : "translate-x-0",
                              "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                        <Switch.Label as="span" className="ml-3">
                          <span className="text-sm font-medium text-gray-900">Annual billing </span>
                          <span className="text-sm text-gray-500">(Save 10%)</span>
                        </Switch.Label>
                      </Switch.Group>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </section>

              {/* Billing history */}
              <section aria-labelledby="billing-history-heading">
                <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 sm:px-6">
                    <h2
                      id="billing-history-heading"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Billing history
                    </h2>
                  </div>
                  <div className="mt-6 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-t border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Data de emissão
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Descrição
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Total
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Estado
                                </th>
                                {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                                <th
                                  scope="col"
                                  className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <span className="sr-only">Ver detalhes</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {payments.map((payment) => (
                                <tr key={payment.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <time>{payment.date}</time>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.description}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.amount}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {payment.status}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href={payment.href}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      Ver detalhes
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
