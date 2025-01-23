import { useState } from "react"
import { useAuthContext } from "../../../../providers/auth/useAuthContext";
import Admin from "../../../../functions/admin";

export const IntroPage = () => {
    const { idToken } = useAuthContext()
    const [email, setEmail] = useState('admin@moblyfix.com.br')
    const [userName, setUsername] = useState('Admin')
    const [password, setPassword] = useState('123456Abc')
    const [companyName, setCompanyName] = useState('Admin')

    const saveHeadeQuarter = async () => {
        if (!email || !userName || !password || !companyName || !idToken) {
            alert('Preencha todos os campos')
            return
        }

        const userData = { email, userName, password, companyName }
        try {
            const newUser = await Admin.createHeadQuarter(idToken, userData);
            console.log('User created successfully:', newUser);
        } catch (error) {
            console.error('Failed to create user:', error);
        }

    }

    return <div className="mx-auto max-w-screen-md flex">
        <div className="w-2/12">
            <nav>
                <ul>
                    <li>Criar headquarter</li>
                </ul>
            </nav>
        </div>
        <div className="flex-1 pl-20 flex-col flex mt-10">
            <input onChange={e => setEmail(e.currentTarget.value)} value={email} className="mb-2 border p-2" type="text" name="email" placeholder="Email" />
            <input onChange={e => setUsername(e.currentTarget.value)} value={userName} className="mb-2 border p-2" type="text" name="userName" placeholder="Nome do usuário" />
            <input onChange={e => setPassword(e.currentTarget.value)} value={password} className="mb-2 border p-2" type="text" name="password" placeholder="Senha" />
            <input onChange={e => setCompanyName(e.currentTarget.value)} value={companyName} className="mb-2 border p-2" type="text" name="companyName" placeholder="Nome da empresa" />
            <button onClick={saveHeadeQuarter}>Salvar</button>
        </div>
    </div>
}

export default IntroPage