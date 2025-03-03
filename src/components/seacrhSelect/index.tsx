import AsyncSelect from "react-select/async";
import { slugify } from "../../functions/utils/slugify";
import { Firestore } from "firebase/firestore";
import { TypeStoresViewList } from "../../types/Stores";

const SearchSelect = ({ requisition, db, store, onChange }: { onChange: (value: { label?: string, value?: string }) => void, store: TypeStoresViewList, db: Firestore, requisition: any }) => {
    const promiseOptions = (inputValue: string) =>
        new Promise<{ label: string, value: string }[]>(async (resolve) => {
            const response = await requisition({ db, wheres: [['_storeId', '==', store._id], [`query.${slugify(inputValue)}`, '==', true]] })
            if (response.docs) {
                resolve(Object.values(response.docs).map((item: any) => ({ label: item.name, value: item._id })));
            }
        });

    return (
        <AsyncSelect
            loadOptions={promiseOptions}
            placeholder="Buscar..."
            onChange={newValue => onChange({ label: newValue?.label, value: newValue?.value })}
        />
    );
};

export default SearchSelect;
