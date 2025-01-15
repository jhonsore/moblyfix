import { Auth, signInWithEmailAndPassword } from "firebase/auth";

async function login({ username, password, auth }: { password: string, username: string, auth: Auth }) {
    return await signInWithEmailAndPassword(auth, username, password)
}

export default login