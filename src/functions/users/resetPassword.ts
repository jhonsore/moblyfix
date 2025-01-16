import { Auth, sendPasswordResetEmail } from "@firebase/auth";

async function resetPassword({ auth, email }: { auth: Auth, email: string }) {
    return sendPasswordResetEmail(auth, email)
}

export default resetPassword