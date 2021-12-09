export const LS = {
  setToken(token: string) {
    localStorage.setItem("token", token);
  },
  setUserId(userId: string) {
    localStorage.setItem("userId", userId);
  },
  setExpDate(expDate: number) {
    localStorage.setItem("expDate", `${expDate}`);
  },

  getToken: () => localStorage.getItem("token"),
  getUserId: () => localStorage.getItem("userId"),
  getExpDate: () => {
    const expDate = localStorage.getItem("expDate");
    if (!expDate) return null;
    return Number(expDate);
  },

  purge() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expDate");
  }
};
