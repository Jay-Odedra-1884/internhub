"use client"
import { handleLogout } from "@/utils/Auth";

function Logout() {
  return (
    <div
      onClick={handleLogout}
      className="text-lg hover:text-gray-400 cursor-pointer text-red-400 font-bold"
    >
      Logout
    </div>
  );
}

export default Logout;
