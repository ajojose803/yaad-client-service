import {create} from "zustand";
import Router from "next/router";
import axiosAdmin from "@/service/axios/axiosAdmin"; // Ensure you send requests with credentials
import { useRouter } from "next/router";

interface AdminAuthState {
  name: string;
  loggedIn: boolean;
  adminLogin: (name: string) => void;
  adminLogout: () => void;
  checkAuth: () => Promise<void>;
}
const useAdminAuthStore = create<AdminAuthState>((set) => ({
  name: "",
  loggedIn: false,

  adminLogin: (name: string) => {
    console.log("Admin login:", name);
    set({ name, loggedIn: true });
  },

  adminLogout: () => {
    const router = useRouter();
    console.log("Admin logout");
    router.push("/admin/login");
  },

  checkAuth: async () => {
    try {
      const { data } = await axiosAdmin().get("/me");
      console.log("Auth check success:", data);
      set({ name: data.name, loggedIn: true });
    } catch (error) {
      console.log("Auth check failed:", error);
      set({ name: "", loggedIn: false });
    }
  },
}));

export default useAdminAuthStore;
