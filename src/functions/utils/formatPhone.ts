export default function formatPhone(value: string) {
    const cleanedValue = value.replace(/\D/g, ""); // Remove tudo que não for número

    if (cleanedValue.length > 11) {
        value = cleanedValue.slice(0, 11); // Limita ao máximo de 11 dígitos
    } else {
        value = cleanedValue;
    }

    if (value.length <= 10) {
        // Formato para telefone fixo (99) 9999-9999
        return value
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        // Formato para celular (99) 99999-9999
        return value
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }
}