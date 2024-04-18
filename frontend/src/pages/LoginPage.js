import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ApiCaller from '../utilities/ApiCaller';


function LoginPage() {
  const { serverUrl } = useAppContext()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  return (
    <>
      {/* {user && <Navigate to='/' replace={true}></Navigate>} */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6"
            onSubmit={handleSubmit((data) => {
              ApiCaller(`${serverUrl}/auth/login`, data).then((res) => {
                const { data } = res.data;
                if (res.data.status) {
                  localStorage.setItem("userId", data._id);
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("name", data.name);
                  localStorage.setItem("role", data.role);
                  localStorage.setItem("email", data.email);
                  console.log("User ID and token saved to localStorage:", data._id, data.token);
                  navigate('/')
                } else {
                  alert(res.data.message)
                }
              })
                .catch((error) => {
                  console.error("Error:", error);
                });
            })}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email is invaild'
                    }
                  })}
                  type="email"
                  // value={"email"}
                  autoComplete="email"
                  placeholder="Enter Email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password required",
                  })}
                  type="password"
                  placeholder="Enter password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                {/* {error && <p className='text-red-500'>{error.message}</p>} */}

              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                Sign in

              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have account?{' '}
            <Link to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage