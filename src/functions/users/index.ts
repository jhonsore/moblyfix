import create from "./create";
import list from "./list";
import login from "./login";
import logout from "./logout";
import read from "./read";
import remove from "./remove";
import resetPassword from "./resetPassword";
import update from "./update";

export const Users = {
    login,
    logout,
    resetPassword,
    list,
    create,
    read,
    delete: remove,
    update
}