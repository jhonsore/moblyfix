import create from "./create";
import remove from "./delete";
import login from "./login";
import logout from "./logout";

import resetPassword from "./resetPassword";


export const Users = {
    login,
    logout,
    resetPassword,
    create,
    delete: remove
}