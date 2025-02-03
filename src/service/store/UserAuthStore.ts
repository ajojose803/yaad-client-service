import { create } from "zustand";

interface UserAuthState {
  user?: string;
  userId?: string;
  image?: string;
  email?: string;
  phone?: string;
  loggedIn?: boolean;
  userLogin: (data: UserAuthState) => void;
  userLogout: () => void;
}

const useAuthStore = create<UserAuthState>((set) => ({
  user: "",
  userId: "",
  image: "",
  email: "",
  phone: "",
  loggedIn: false,

  userLogin: (data) => set({ ...data }),

  userLogout: () =>
    set(() => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      return {
        user: "",
        userId: "",
        image: "",
        email: "",
        phone: "",
        loggedIn: false,
      };
    }),
}));

export default useAuthStore;
