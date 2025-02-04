import { create } from "zustand";

interface UserAuthState {
  user?: string;
  userId?: string;
  image?: string;
  email?: string;
  phone?: string;
  loggedIn: boolean;
  accessToken: string | null;
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
  accessToken: null,

  userLogin: (data) => {
    set({ ...data, loggedIn: true, accessToken: data.accessToken });
  },

  userLogout: () => {
    return set(() => ({
      user: "",
      userId: "",
      image: "",
      email: "",
      phone: "",
      loggedIn: false,
      accessToken: null,
    }));
  },
}));

export default useAuthStore;
