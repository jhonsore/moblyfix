export default function convertNumberOs(osNumber: number) {
    const numeroString = osNumber.toString();
    const zerosNecessarios = 5 - numeroString.length;

    if (zerosNecessarios > 0) {
        return '0'.repeat(zerosNecessarios) + numeroString;
    } else {
        return numeroString;
    }
}