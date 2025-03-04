import TYPE_STATUS from "../../consts/TYPE_STATUS";

export default function getLabelByStatus(status: keyof typeof TYPE_STATUS) {
    if (status === TYPE_STATUS.created.value) return 'warning'
    if (status === TYPE_STATUS.canceled.value) return 'destructive'
    if (status === TYPE_STATUS.finished.value) return 'success'
    if (status === TYPE_STATUS.inService.value) return 'primary'
}