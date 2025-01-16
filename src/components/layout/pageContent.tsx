import { ReactNode } from "react";

const PageContent = ({ children }: { children: ReactNode }) => <div >
    <div className=" px-4 sm:px-6 lg:px-8 py-20">
        <div className=" mx-auto bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    </div>
</div>
export default PageContent



