import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default async function uploadImageToFirebase({ file, storage, path }: { path: string, file: Blob, storage: FirebaseStorage }): Promise<{ url: string; path: string }> {
    const pathFile = `${path}/${Date.now()}.jpg`
    const storageRef = ref(storage, pathFile);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { url, path: pathFile };
};