import React, { useRef } from "react";
import { LockClosedIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from "next/router";


export default function LoginPage() { const auth = useAuth();

  const [errorLogin, setErrorLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const route = useRouter()

  const submitHandle =e=> { e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setErrorLogin(null);
    setLoading(true);

    auth
      .signIn(email, password)
      .then(()=> {
        route.push('/Dashboard');
      })
      .catch(error=> {
        if(error.response?.status === 401){
          setErrorLogin('Usuario o password incorrecto.');
        }else if(error.request){
          setErrorLogin('Tenemos un problema');
        }else{ //// setErrorLogin('Algo salió mal.');
          setLoading(true);
        }
        setLoading(false);
      });
  };

return ( <>

<div className="min-h-full flex items-center
  justify-center py-12 px-4 sm:px-6 lg:px-8"
> <div className="max-w-md w-full space-y-8">
    <div>
      <img className="mx-auto h-12 w-auto" 
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" 
      />
      <h1 className="mt-6 text-center text-3xl 
        font-extrabold text-gray-900" 
      > Sign in to your account
      </h1>

      <h6 className="text-center mt-1 text-coolGray-400"> account test: 
      <b className="text-coolGray-700">{' '}rodri@dev.com</b>{' '}
      pass: <b className="text-coolGray-700">dev</b></h6>

    </div>

    <form className="mt-8 space-y-6" onSubmit={submitHandle}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input id="email-address" name="email" ref={emailRef}
            type="email" autoComplete="email" required
            className="appearance-none rounded-none relative 
              block w-full px-3 py-2 border border-gray-300 
              placeholder-gray-500 text-gray-900 rounded-t-md 
              focus:outline-none focus:ring-indigo-500 
              focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input id="password" name="password" type="password" ref={passwordRef}
            autoComplete="current-password" required
            className="appearance-none rounded-none relative 
              block w-full px-3 py-2 border 
              border-gray-300 placeholder-gray-500 text-gray-900 
              rounded-b-md focus:outline-none focus:ring-indigo-500 
              focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" 
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button type="submit" disabled={loading} className="group relative w-full 
          flex justify-center py-2 px-4 border border-transparent text-sm 
          font-medium rounded-md text-white bg-indigo-600 
          hover:bg-indigo-700 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        > <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-indigo-500 
              group-hover:text-indigo-400" aria-hidden="true" 
            />
          </span>
          Sign in
            { loading && (
              <span className="flex absolute h-4 w-4 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex 
                  h-full w-full rounded-full bg-red-400 opacity-75">
                </span>
                <span className="relative inline-flex rounded-full 
                  h-4 w-4 bg-cyan-400">

                </span>
              </span>
            )}
        </button>
      </div>
      {errorLogin && (
        <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 
          rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"
        >
          <span className="font-medium">Error!</span> {errorLogin}
        </div>
      )}

      <h6 className="text-center text-coolGray-400">admin account: 
      <b className="text-coolGray-700">{' '}admin@mail.com</b>{' '}
      pass: <b className="text-coolGray-700">admin123</b></h6>

    </form>
  </div>
</div>

</> ); };