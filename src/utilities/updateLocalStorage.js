export const updateLocalStorage = (state) => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  };

  export const getLocalStorage=(state)=>{
    return window.localStorage.getItem("cart")

  }