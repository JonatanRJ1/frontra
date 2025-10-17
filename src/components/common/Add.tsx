import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const AddProducts: React.FC<{
    trigger: React.ReactNode;
    children: React.ReactNode;
    title?: string;
    description?: string;
}> = ({ trigger, children, title, description }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="flex flex-col max-h-[calc(100vh-5rem)]">
                <DialogHeader>
                    <DialogTitle>{title || "Modal"}</DialogTitle>
                    <DialogDescription>
                        {description || "Modal description"}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddProducts;