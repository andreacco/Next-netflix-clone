import AuthProvider from "@/context/authProvider";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props){
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}