export const updateLocalStorage = (state) => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  };