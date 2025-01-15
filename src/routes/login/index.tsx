import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import controller from "./controller"
import { Link, useNavigate } from "react-router"
import BlockPageLoading from "../../components/loadings/BlockPageLoading"
import { useAuthContext } from "../../providers/auth/useAuthContext"
import { useEffect } from "react"

function Login() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { form, onSubmit, errorLogin, statusLoading } = controller()

  useEffect(() => {
    // check if user is logged, if so, navigate to dashboard
    if (user) {
      navigate('/dashboard/')
    }
  }, [user])

  return <div className=" h-svh flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F1F5F9]">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-12 w-auto"
        src="/img/logo.svg"
        alt="logo"
      />
    </div>
    <div className=" sm:mx-auto sm:w-full sm:max-w-md mt-7 ">
      <div className="bg-white  shadow sm:rounded-lg ">
        <div className=''>
          <h1 className="font-medium border-b w-full py-2 pl-4 ">
            Preencha os campos abaixo para efetuar o login
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-5 px-4 sm:px-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite aqui sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorLogin && <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                {errorLogin}
              </AlertDescription>
            </Alert>}

            <div className="text-sm text-right">
              <Link to={'/recuperar-senha'} className="font-medium text-indigo-600 hover:text-indigo-500"> Esqueceu sua senha?</Link>
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </Form>
      </div>
    </div>
    {statusLoading && <BlockPageLoading />}
  </div>
}

export default Login
