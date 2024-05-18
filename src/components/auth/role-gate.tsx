"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import FormError from "./FormError";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: string;
}


const RoleGate : React.FC<RoleGateProps> = ({children, allowedRole}) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <>
                <FormError message="You do not have permission to view this content" />
            </>
          )
    }

    return (
        <>
            {children}
        </>
    )


}

export default RoleGate