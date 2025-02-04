import { useState } from "react"
import { useAuthContext } from "../../../../providers/auth/useAuthContext"
import Admin from "../../../../functions/admin"

const FormCreateMaster = () => {
    const { idToken } = useAuthContext()
    const [email, setEmail] = useState('master@moblyfix.com.br')
    const [userName, setUsername] = useState('Master')
    const [password, setPassword] = useState('6gW|N?97;12#Qedf')

    const saveHeadeQuarter = async () => {
        if (!email || !userName || !password || !idToken) {
            alert('Preencha todos os campos')
            return
        }

        const userData = { email, userName, password }
        try {
            const newUser = await Admin.createMaster(idToken, userData);
            console.log('User created successfully:', newUser);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    }
    return <div>
        <h2 className="text-2xl mb-10 font-bold mt-20">Criar master user</h2>
        <div className="">
            <div><input onChange={e => setEmail(e.currentTarget.value)} value={email} className="mb-2 border p-2" type="text" name="email" placeholder="Email" /></div>
            <div><input onChange={e => setUsername(e.currentTarget.value)} value={userName} className="mb-2 border p-2" type="text" name="userName" placeholder="Nome do usuário" /></div>
            <div><input onChange={e => setPassword(e.currentTarget.value)} value={password} className="mb-2 border p-2" type="text" name="password" placeholder="Senha" /></div>
            <div><button onClick={saveHeadeQuarter}>Salvar</button></div>
        </div>
        <hr className="my-10" />
    </div>
}

export default FormCreateMaster