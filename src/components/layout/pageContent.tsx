import { ReactNode } from "react";

const PageContent = ({ children }: { children: ReactNode }) => <div >
    <div className=" px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto bg-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    </div>
</div>
export default PageContent



