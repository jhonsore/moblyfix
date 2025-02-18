import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useFirebaseContext } from "../../providers/firebase/useFirebaseContext"
import { useCallback, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Cropper from "react-easy-crop";
import { removeTrailingSlash } from "../../functions/utils/removeTrailingSlash";
import { slugify } from "../../functions/utils/slugify";
import { getFileNameWithoutExtension } from "../../functions/utils/getFileNameWithoutExtension";
import uuid from "../../functions/utils/uuid";

export function ImageUploader({ title, subtitle, folder, onUploaded }: { onUploaded: (url: string) => void, folder: string, title: string, subtitle?: string }) {
    const { storage } = useFirebaseContext()
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [fileUploaded, setFileUploaded] = useState<File | undefined>()

    const onCropComplete = useCallback(async (_: any, croppedAreaPixels: any) => {
        if (!image) return;

        const img = new Image();
        img.src = image;
        await img.decode();

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
            if (blob) {
                setCroppedImage(new File([blob], "cropped-image.png", { type: "image/png" }));
            }
        }, "image/png");
    }, [image]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
            setFileUploaded(file)
        }
    };

    const uploadToFirebase = async () => {
        if (!croppedImage || !fileUploaded) return;
        const name = `${uuid()}-${slugify(getFileNameWithoutExtension(fileUploaded.name))}`
        const storageRef = ref(storage, `${removeTrailingSlash(folder)}/${name}`);
        await uploadBytes(storageRef, croppedImage);
        const url = await getDownloadURL(storageRef);
        onUploaded(url)
    };

    const onOpenChangeHandler = (open: boolean) => {
        if (!open) {
            setImage(null)
            setCroppedImage(null)
            setCrop({ x: 0, y: 0 });
            setZoom(1)
            setFileUploaded(undefined)
        }
    }

    return (
        <Dialog onOpenChange={onOpenChangeHandler}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {subtitle}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 p-4">
                    <label className="cursor-pointer h-9 px-4 py-2 rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                        Selecione a imagem
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                    {image && (
                        <div className="relative w-full h-80 border border-gray-300">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={uploadToFirebase} disabled={!croppedImage} type="submit" variant={'primary'}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
