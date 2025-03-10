import { Signature } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import ReactSignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import uploadImageToFirebase from "../../functions/utils/uploadImageToFirebase";
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext";

export default function SignUploader({ onCreate, path }: { path: string, onCreate: ({ path, url }: { url: string, path: string }) => void }) {
    const sigCanvas = useRef<ReactSignatureCanvas | null>(null);
    const [uploading, setUploading] = useState(false);
    const { storage } = useFirebaseContext()
    const [open, setOpen] = useState(false)

    const saveSignature = async () => {
        if (!sigCanvas.current) return;
        const canvas = sigCanvas.current.getCanvas();
        const dataURL = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataURL)).blob();

        setUploading(true);

        try {
            const url = await uploadImageToFirebase({ file: blob, storage, path });
            onCreate(url)
        } catch (error) {
            alert('Ocorreu um erro ao salvar a assinatura')
        } finally {
            setUploading(false);
            setOpen(false)
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
                <Button variant="primary">
                    <Signature />
                    Inserir assinatura</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assinatura</DialogTitle>
                </DialogHeader>
                <div>
                    <ReactSignatureCanvas
                        ref={sigCanvas}
                        canvasProps={{ className: "border rounded-md w-96 h-48" }}
                    />

                </div>
                <DialogFooter>
                    <div className="flex gap-2">
                        <Button variant={"outline"} onClick={() => sigCanvas.current?.clear()}>Limpar</Button>
                        <Button variant={'primary'} onClick={saveSignature} disabled={uploading}>
                            {uploading ? "Enviando..." : "Salvar Assinatura"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}