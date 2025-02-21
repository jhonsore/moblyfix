export default function cleanValue(value: string) {
    return value.replace(/\D/g, ""); // Remove tudo que não for número
}