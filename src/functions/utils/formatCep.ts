export default function formatCep(value: string): string {
    return value
        .replace(/\D/g, "") // Remove tudo que não for número
        .replace(/^(\d{5})(\d)/, "$1-$2") // Adiciona o hífen após os 5 primeiros dígitos
        .slice(0, 9); // Limita ao tamanho máximo do CEP
}