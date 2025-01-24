import { Auth, signOut } from "@firebase/auth";

function logout({ auth }: { auth: Auth }) {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch(() => {
        // An error happened.
    });
}

export default logout