import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuthState {
  user?: string;
  userId?: string;
  image?: string;
  email?: string;
  phone?: string;
  loggedIn: boolean;
  accessToken?: string;
  userLogin: (data: { accessToken: string } & Omit<UserAuthState, "loggedIn" | "userLogout" | "setAccessToken">) => void; //
  setAccessToken: (accessToken: string) => void;
  userLogout: () => void;
}

const useAuthStore = create<UserAuthState>()(
  persist(
    (set) => ({
      user: "",
      userId: "",
      image: "",
      email: "",
      phone: "",
      loggedIn: false,
      accessToken: undefined,

      // Store user details and access token in Zustand
      userLogin: ({ accessToken, ...data }) => {
        set({ ...data, accessToken, loggedIn: true });
      },

      // Update the access token separately (used for token refresh in Axios interceptor)
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      // Logout by clearing Zustand state
      userLogout: () => {
        set({
          user: "",
          userId: "",
          image: "",
          email: "",
          phone: "",
          loggedIn: false,
          accessToken: undefined,
        });
        // Redirect user after logout
        window.location.href = "/signin";
      },
    }),
    {
      name: "auth-storage", // Store auth state in localStorage
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      }, // Use sessionStorage (or localStorage if you prefer)
    }
  )
);

export default useAuthStore;
