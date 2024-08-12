import { createContext, useEffect, useState } from "react";

export const Context = createContext({
  userData: {
    username: "",
    email: "",
    fName: "",
    lName: "",
    age: null,
    address: "",
  },
});

export function ContextProvider({ children }) {
  /**
   * For managing user details.
   */
  const [userData, setUser] = useState(getUserDataFromLocalStorage);

  /**
   * For storing cart details.
   */
  const [cartItems, setCartItems] = useState([]);

  /**
   * Updates the user data in local storage and state.
   *
   * @param {Object} data - The new user data to be merged with the existing data.
   */
  function handleUserDataChange(data) {
    const uData = getUserDataFromLocalStorage();
    localStorage.setItem("user", JSON.stringify({ ...uData, ...data }));
    setUser((prev) => ({ ...prev, ...data }));

    let allUsers = JSON.parse(localStorage.getItem("user-list") || []);

    allUsers = allUsers?.map((x) => {
      if (x.email === userData?.email) {
        return { ...x, ...data };
      }
      return x;
    });

    localStorage.setItem("user-list", JSON.stringify(allUsers));
  }

  /**
   * Retrieves user data from local storage.
   *
   * @returns {Object} - The user data object from local storage. If no data is found
   * or parsing fails, a placeholder object with default values is returned.
   */
  function getUserDataFromLocalStorage() {
    const placeholder = {
      username: "",
      email: "",
      fName: "",
      lName: "",
      age: null,
      address: "",
    };

    let user = localStorage.getItem("user");
    if (user) {
      try {
        user = JSON.parse(user);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        user = placeholder;
      }
    } else {
      user = placeholder;
    }

    return user;
  }

  /**
   * Checks if an item exists in the cart.
   *
   * @param {number|string} itemId - The ID of the item to check.
   * @returns {Object|undefined} - The cart item object if found, otherwise undefined.
   */
  function isExistOnCart(itemId) {
    const userContainer = getAllCartItems() || [];
    return userContainer.find((x) => x?.id === itemId);
  }

  /**
   * Adds an item to the cart.
   *
   * If the item already exists in the cart, its quantity is increased by one.
   * Otherwise, the item is added to the cart with a default quantity of one.
   *
   * @param {Object} item - The item to be added to the cart. The item object should contain at least an `id` and other relevant properties.
   */
  function addToCart(item) {
    const cartContainer = getAllCartItems() || [];

    if (isExistOnCart(item?.id)) {
      addQty(item?.id);
      return;
    }

    setCartItems((prev) => [
      { ...item, email: userData?.email, qty: 1 },
      ...prev,
    ]);

    localStorage.setItem(
      "cart",
      JSON.stringify([
        { ...item, email: userData?.email, qty: 1 },
        ...cartContainer,
      ])
    );
    console.log("item added to cart successfully.");
  }

  /**
   * Increases the quantity of a specific item in the cart by one.
   *
   * @param {number|string} itemId - The ID of the item whose quantity should be increased.
   */
  function addQty(itemId) {
    const cartContainer = getAllCartItems() || [];
    const container = cartContainer.map((x) => {
      if (x.id === itemId) {
        return {
          ...x,
          qty: x?.qty + 1,
        };
      }
      return x;
    });

    localStorage.setItem("cart", JSON.stringify(container));

    setCartItems((prev) => {
      return prev?.map((x) => {
        if (x.id === itemId) {
          return {
            ...x,
            qty: x?.qty + 1,
          };
        }
        return x;
      });
    });
    console.log("quantity added.");
  }

  /**
   * Decreases the quantity of a specific item in the cart by one.
   * If the quantity reaches zero, the item is removed from the cart.
   *
   * @param {number|string} itemId - The ID of the item whose quantity should be decreased.
   */
  function minusQty(itemId) {
    const cartContainer = getAllCartItems() || [];
    const container = cartContainer
      .map((x) => {
        if (x.id === itemId) {
          return {
            ...x,
            qty: x?.qty - 1,
          };
        }
        return x;
      })
      .filter((x) => x.qty);

    localStorage.setItem("cart", JSON.stringify(container));

    setCartItems((prev) => {
      return prev
        ?.map((x) => {
          if (x.id === itemId) {
            return {
              ...x,
              qty: x?.qty - 1,
            };
          }
          return x;
        })
        .filter((x) => x.qty);
    });
    console.log("quantity reduced.");
  }

  /**
   * Retrieves all cart items from local storage.
   *
   * @returns {Array<Object>} - An array of cart item objects. If no items are found or if there is an error parsing the data,
   *                             an empty array is returned.
   */
  function getAllCartItems() {
    let cartContainer = localStorage.getItem("cart");
    if (cartContainer) {
      cartContainer = JSON.parse(cartContainer || []) || [];
    }
    if (!cartContainer) {
      cartContainer = [];
    }
    return cartContainer;
  }

  /**
   * Retrieves cart items associated with the current user.
   *
   * @returns {Array<Object>} - An array of cart item objects that match the current user's email.
   *                             If no items are associated with the user, an empty array is returned.
   */
  function getCartItems() {
    const cartContainer = getAllCartItems();
    return cartContainer.filter((x) => {
      if (x?.email === userData?.email) {
        return x;
      }
    });
  }

  useEffect(() => {
    setCartItems(getCartItems() || []);
  }, []);

  return (
    <Context.Provider
      value={{
        userData,
        cartItems,
        addToCart,
        getCartItems,
        isExistOnCart,
        minusQty,
        addQty,
        handleUserDataChange,
      }}
    >
      {children}
    </Context.Provider>
  );
}
