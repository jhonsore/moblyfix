export default function isLate(date: Date) {
    // Converte as datas para milissegundos
    const diffEmMs = Math.abs(new Date().getTime() - date.getTime());

    // Converte milissegundos para dias
    const diffEmDias = Math.ceil(diffEmMs / (1000 * 60 * 60 * 24));
    return { dias: diffEmDias, isLate: diffEmDias > 10 };
}