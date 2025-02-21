export default function formatToBrazilianReal(value: number | string): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        return 'Invalid Value';
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return formatter.format(numericValue);
}