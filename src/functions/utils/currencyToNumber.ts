export const currencyToNumber = (value: string): number => {
    if (!value) return 0;

    // Remove "R$", espaços e pontos dos milhares, substitui vírgula por ponto
    const numericValue = value.replace(/[^\d,]/g, "").replace(",", ".");

    return parseFloat(numericValue) || 0;
};