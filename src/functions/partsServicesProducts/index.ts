import create from "./create"
import list from "./list"
import read from "./read"
import remove from "./remove"
import update from "./update"

const PartsServicesProducts = {
    create,
    update,
    read,
    delete: remove,
    list
}
export default PartsServicesProducts