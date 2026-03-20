import { signOut } from "next-auth/react";

export const handleLogout = () => {
    signOut();
}