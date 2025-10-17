import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
const TriggerProducts: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
    return (
        <Button {...props}>
            <Plus />
        </Button>
    );
}


export default TriggerProducts;