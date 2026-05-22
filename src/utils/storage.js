const TOKEN_KEY = "movieverse_token";
const USER_KEY = "movieverse_user";
const CHECKOUT_KEY = "movieverse_checkout";

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(USER_KEY),
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getCheckout: () => {
    const checkout = sessionStorage.getItem(CHECKOUT_KEY);
    return checkout ? JSON.parse(checkout) : null;
  },
  setCheckout: (checkout) => sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkout)),
  clearCheckout: () => sessionStorage.removeItem(CHECKOUT_KEY),
};
