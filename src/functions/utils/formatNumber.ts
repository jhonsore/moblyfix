export default function formatNumber(input: string): string {
    // Remove qualquer caractere que não seja número ou ponto
    let sanitized = input.replace(/[^0-9.]/g, "");

    // Garantir que há no máximo um ponto decimal
    const parts = sanitized.split(".");
    if (parts.length > 2) {
        sanitized = parts[0] + "." + parts.slice(1).join("");
    }

    return sanitized;
}