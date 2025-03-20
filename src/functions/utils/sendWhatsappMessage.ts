export default function sendWhatsappMesage({ phone, message }: { phone: string, message: string }) {
    const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(link);
}