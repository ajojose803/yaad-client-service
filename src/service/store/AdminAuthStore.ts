import {create} from "zustand";
import Router from "next/router";
import axiosAdmin from "@/service/store/AdminAuthStore"; // Ensure you send requests with credentials

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
    console.log("Admin logout");
    set({ name: "", loggedIn: false });
    Router.push("/admin/login");
  },

  checkAuth: async () => {
    try {
      const { data } = await axiosAdmin().get("/admin/me");
      console.log("Auth check success:", data);
      set({ name: data.name, loggedIn: true });
    } catch (error) {
      console.log("Auth check failed:", error);
      set({ name: "", loggedIn: false });
    }
  },
}));

export default useAdminAuthStore;
