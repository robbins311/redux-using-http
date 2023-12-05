import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-action";

let isInitial = true;

function App() {
  const disaptch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    disaptch(fetchCartData());
  }, [disaptch]);

  // 1. redux에서 thunk 활용하기(액션 크리에이터)
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      disaptch(sendCartData(cart));
    }
  }, [cart, disaptch]);

  //2. components 내에서 reudx & http 활용
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     disaptch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending Cart Data!",
  //       })
  //     );
  //     const response = await fetch(
  //       "https://react-https-4b1d6-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("sending data failed.");
  //     }
  //     disaptch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!...",
  //         message: "Sending Cart Data Successfully!",
  //       })
  //     );
  //   };
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((err) => {
  //     disaptch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!...",
  //         message: "Sending Cart Data faileed!",
  //       })
  //     );
  //   });
  // }, [cart, disaptch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
