
export const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, ""); // Remove tudo que não é número
    const floatValue = parseFloat(numericValue) / 100; // Divide por 100 para centavos
    if (isNaN(floatValue)) return "";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(floatValue);
};