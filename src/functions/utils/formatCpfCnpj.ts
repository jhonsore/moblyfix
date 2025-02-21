export default function formatCpfCnpj(value: string): string {
    const cleanedValue = value.replace(/\D/g, ""); // Remove tudo que não for número

    if (cleanedValue.length <= 11) {
        // CPF: 999.999.999-99
        return cleanedValue
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1-$2")
            .slice(0, 14); // Limita ao tamanho do CPF
    } else {
        // CNPJ: 99.999.999/0001-99
        return cleanedValue
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .slice(0, 18); // Limita ao tamanho do CNPJ
    }
}