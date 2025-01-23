import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormSchema from "../schemas/form"
import { useState } from "react"
import { Users } from "../../../../../functions/users"
import { useFirebaseContext } from "../../../../../providers/firebase/useFirebaseContext"
import { useNavigate } from "react-router"

const controller = () => {
  const navigate = useNavigate()
  const { auth } = useFirebaseContext()
  const [errorLogin, setErrorLogin] = useState('')
  const [statusLoading, setStatusLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "admin@moblyfix.com.br",
      password: '123456Abc'
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setStatusLoading(true)
    Users.login({ ...data, auth })
      .then(() => {
        setStatusLoading(false)
        navigate('/admin/')
      })
      .catch((error) => {
        const errorCode = error.code;
        setStatusLoading(false)
        let message = 'Ocorreu um erro, tente novamente mais tarde!'
        if (errorCode === 'auth/invalid-credential') message = 'Email ou senha incorretos'
        setErrorLogin(message)

      });
  }

  return { form, onSubmit, errorLogin, statusLoading }
}

export default controller