import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Store";
import ProductImage from "../../Components/ProductImage/ProductImage";
import EmptyImg from "../../assets/item_not_found.jpg"

export default function () {
  const { getCartItems, addQty, minusQty, cartItems } = useContext(Context);

  const [items, setItems] = useState([]);

  const listCartItems = () => {
    setItems(getCartItems() || []);
  };


  useEffect(() => {
    listCartItems();
  }, []);

  return (
    <section className="h-100 h-custom">
      <div className="container p-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div>
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">
                          {items?.length} items
                        </h6>
                      </div>

                      {!!cartItems?.length ?
                        cartItems?.map((x) => (
                          <>
                            <hr className="my-4" />
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">

                                <ProductImage image={x?.image} />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                {/* <h6 className="text-muted">Shirt</h6> */}
                                <h6 className="mb-0">{x?.title}</h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center gap-3">
                                <button
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    minusQty(x?.id);
                                  }}
                                >
                                  -
                                </button>

                                {x?.qty}

                                <button
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    addQty(x?.id);
                                  }}
                                >
                                  +
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">$ {x?.price}.00</h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" className="text-muted">
                                  <i className="fas fa-times"></i>
                                </a>
                              </div>
                            </div>
                          </>
                        )) : 
                        <img className="empty-img" src={EmptyImg} alt="" srcset="" />
                        }

                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a href="/home" className="text-body">
                            <i className="fas fa-long-arrow-alt-left me-2"></i>
                            Back to home
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
