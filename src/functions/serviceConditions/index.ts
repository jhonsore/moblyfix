import create from "./create"
import read from "./read"
import remove from "./remove"
import update from "./update"

const ServiceConditions = {
    create,
    update,
    read,
    delete: remove
}
export default ServiceConditions