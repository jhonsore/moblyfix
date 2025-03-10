import { deleteObject, FirebaseStorage, ref } from "firebase/storage";

const deleteFileFromStorage = async ({ filePath, storage }: { filePath: string, storage: FirebaseStorage }) => {
    try {
        const fileRef = ref(storage, filePath);

        await deleteObject(fileRef);
    } catch (error) {
    }
};

export default deleteFileFromStorage