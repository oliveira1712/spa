import Link from "next/link";
import MultiStepForm from "./multiStepForm/MultiStepForm";

export default function Registration() {
  return (
    <>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <svg
          viewBox="0 0 1090 1090"
          aria-hidden="true"
          fill="none"
          preserveAspectRatio="none"
          className="max-h-full max-w-6xl mt-40 absolute -top-7 left-1/2 -z-10  -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
        >
          <circle cx="545" cy="545" r="544.5"></circle>
          <circle cx="545" cy="545" r="480.5"></circle>
          <circle cx="545" cy="545" r="416.5"></circle>
          <circle cx="545" cy="545" r="352.5"></circle>
        </svg>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Registe a sua conta</h2>
          <p className="mt-3 text-center text-lg text-gray-600">
            Já possui uma conta?&nbsp;
            <Link href="/login">
              <span className="text-cyan-600">Inicie Sessão</span>
            </Link>
          </p>
        </div>
        <MultiStepForm />
      </div>
    </>
  );
}
