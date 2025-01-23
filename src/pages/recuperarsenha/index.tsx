

function RecuperarSenha() {

  return <div className=" h-svh flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F1F5F9]">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-12 w-auto"
        src="./img/logo.svg"
        alt="logo"
      />

    </div>

    <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-7 ">
      <div className="bg-white  shadow sm:rounded-lg ">
        <div className=''>
          <h1 className="font-medium border-b w-full py-2 pl-4 ">
            Recuperação de senha
          </h1>
        </div>
        <form className="space-y-6 py-5 px-4 sm:px-4" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                placeholder='Digite seu endereço de email'
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
           Recuperar senha
          </button>
        </div>
      </form>

      
    </div>
  </div>
</div>
}

export default RecuperarSenha
