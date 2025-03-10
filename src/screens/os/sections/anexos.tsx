import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button"
import { useOsContext } from "../provider/useOsContext"
import { Loading } from "../../../components/loading";
import deleteFileFromStorage from "../../../functions/utils/deleteFileFromStorage";
import { TypeOs } from "../../../types/Os";
import resizeImage from "../../../functions/utils/resizeImage";
import uploadImageToFirebase from "../../../functions/utils/uploadImageToFirebase";
import { useFirebaseContext } from "../../../providers/firebase/useFirebaseContext";
import { PATH_ATTACHMENTS_OS } from "../item-form";
import { useParams } from "react-router";
import { DB } from "../../../functions/database";
import { toast } from "../../../hooks/use-toast";



const OSAnexos = () => {
    const { os, setOs } = useOsContext()
    const [imageUrl, setImageUrl] = useState<TypeOs['photos']>([]);
    const [statusLoading, setStatusLoading] = useState(false)
    const { db, storage } = useFirebaseContext()
    const { id } = useParams()
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!os) return
        setImageUrl(os.photos)
    }, [os])

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && setOs && os) {
            try {
                setStatusLoading(true)
                const resizedImage = await resizeImage({ file, maxWidth: 1000, maxHeight: Infinity });
                const url = await uploadImageToFirebase({ file: resizedImage, storage, path: PATH_ATTACHMENTS_OS });
                const _imageUrl = [...imageUrl, url]
                setImageUrl(_imageUrl);
                setOs({ ...os, photos: _imageUrl })

                if (id) {
                    DB.os.update({
                        db,
                        id,
                        data: { photos: _imageUrl }
                    })
                }

            } catch (error) {
                toast({
                    duration: 4000,
                    variant: "destructive",
                    title: "Erro",
                    description: "Ocorreu um erro ao realizar o upload da imagem"
                })
            }
            setStatusLoading(false)
        }
    };


    function removeImage(image: typeof imageUrl[0]) {
        if (!setOs || !os) return
        const newImages = imageUrl.filter(item => item.url !== image.url)
        setImageUrl(newImages)
        deleteFileFromStorage({ filePath: image.path, storage })
        setOs({ ...os, photos: newImages })
        if (id) {
            DB.os.update({
                db,
                id,
                data: { photos: newImages }
            })
        }
    }

    if (!os || !setOs) {
        return <div>Erro ao carregar anexos</div>
    }

    return <div>
        {statusLoading && <Loading />}
        <div className='flex gap-4 mt-4 flex-wrap'>
            {
                imageUrl.map(item => <div key={item.url} className={`relative w-32 h-32`}>
                    <img src={item.url} alt="Imgem do aparelho" />
                    <button onClick={() => removeImage(item)}>
                        <span className="material-symbols-outlined absolute top-1 right-2 text-slate-500 text-lg px-1 bg-slate-300 rounded-full">
                            delete
                        </span>
                    </button>
                </div>)
            }
            <div className=" flex relative cursor-pointer">
                <Button type="button" variant={'primary'}><span className="material-symbols-outlined sm:mr-2 cursor-pointer">
                    add_a_photo
                </span> <span className="hidden sm:block">Nova foto</span></Button>
                <input className="absolute top-0 left-0 w-full h-full opacity-0  cursor-pointer " type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            </div>
        </div>

    </div>

}

export default OSAnexos