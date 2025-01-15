import { z } from "zod"
const FormSchema = z.object({
    username: z.string().email("Digite um email válido"),
    password: z.string({ required_error: 'Digite a senha' }).min(5, {
        message: "A senha deve conter ao menos 5 caracteres",
    }),
})

export default FormSchema