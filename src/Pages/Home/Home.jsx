import placeholderImg from "../../assets/placeholder-image.png";
import { useContext, useEffect, useState } from "react";
import "./home.scss";
import { getCategoryList, getProductList } from "../../Api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Context } from "../../Context/Store";
import ProductImage from "../../Components/ProductImage/ProductImage";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../assets/cart.svg";
import starIcon from "../../assets/starIcon.svg";
import halfStarIcon from "../../assets/halfStarIcon.svg";

export default function Home() {

  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(6);

  async function fetchMoreData() {
    try {
      setLoading(true);
      const result = await getProductList(category, sort, search, index, 3);
      setData((prev) => [...prev, ...result?.data?.products]);
      result?.data?.total > index ? setHasMore(true) : setHasMore(false);
      setIndex((prevIndex) => prevIndex + 3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleFetchData = async () => {
    try {
      setLoading(true);
      setData([]);
      const result = await getProductList(category, sort, search, 0, 6);
      setData(result?.data?.products || []);
      result?.data?.total > index ? setHasMore(true) : setHasMore(false);
      setIndex((prevIndex) => prevIndex + 6);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCategory = async () => {
    try {
      const result = await getCategoryList();
      setCategoryList(result?.data || []);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearchChange = (e) => {
    setCategory("");
    setSearch(e?.target?.value);
  };

  const handleCategoryChange = (e) => {
    setSearch("");
    setCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    setIndex(0);
    handleFetchData();
  }, [category, sort, search]);

  useEffect(() => {
    handleFetchCategory();
  }, []);

  return (
    <div className="container d-flex flex-column mt-5 gap-5 px-3 h-100">
      <div className="filterWrapper gap-1 container d-flex flex-wrap justify-content-between px-5">
        <div className="col-12 col-sm-4 col-md-3 col-lg-3 mb-3">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option value={""} selected>
              Categories
            </option>
            {!!categoryList.length &&
              categoryList.map((x, i) => (
                <option key={i} value={`/category/${x}`} label={x} />
              ))}
          </select>
        </div>

        <div className="col-12 col-sm-4 col-md-4 col-lg-4 mb-3 mb-sm-0">
          <select
            onChange={handleSortChange}
            value={sort}
            className="form-select"
            aria-label="Default select example"
          >
            <option value={""} selected>
              Sort
            </option>
            <option value="sortBy=price&order=asc&">Low to high</option>
            <option value="sortBy=price&order=desc&">High to Low</option>
          </select>
        </div>

        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
          <input
            onChange={handleSearchChange}
            value={search}
            type="text"
            placeholder="Search..."
            className="form-control"
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        endMessage={<End/>}
      >
        <div className="d-flex row justify-content-center gap-2 ">
          {data.map((x, i) => (
            <Card
              id={x.id}
              key={i}
              image={x?.thumbnail}
              price={x.price}
              title={x.title}
              desc={x.description}
              rating={x?.rating}
            />
          ))}
          {loading && (
            <>
              <LazyCard />
              <LazyCard />
              <LazyCard />
            </>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

function End() {
  return <div className="text-center py-5">looks like you reach the end.</div>;
}

function Card({ title, desc, image, price, id, rating }) {
  const { addToCart, isExistOnCart } = useContext(Context);

  const navigate = useNavigate();

  return (
    <div class="col-12 col-md-3">
      <div class="card shadow">
        <ProductImage image={image} />
        <div class="card-footer border-top border-gray-300 p-4">
          <h3 class="title h5">{title}</h3>
          <h3 class="h6 desc fw-light text-gray mt-2">{desc}</h3>
          <div class="ratingWrapper d-flex mt-3">
            {Array(Math.floor(rating))
              .fill(0)
              .map(() => (
                <img src={starIcon} alt="" />
              ))}
            {Math.floor(rating) - rating && <img src={halfStarIcon} alt="" />}
            <span class="badge rating ms-2">{rating}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="h5 mb-0 text-gray">$ {price}</span>
            {isExistOnCart(id) ? (
              <button
                onClick={() => navigate("/cart")}
                class="btn btn-xs  go-to-cart"
              >
                <img className="cart-icon" src={cartIcon} alt="" /> Go to cart
              </button>
            ) : (
              <button
                onClick={() =>
                  addToCart({ title, desc, image, price, id, rating })
                }
                class="btn btn-xs add-to-cart"
              >
                <img className="cart-icon" src={cartIcon} alt="" /> Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    // <div className="card cursor-pointer-parent px-0 col-lg-3 gap-1 col-md-3 col-sm-4 col-6  border">
    //   <ProductImage image={image} />
    //   <div className="px-3">
    //     <p className="price">
    //       ${price} - {id}
    //     </p>
    //     <h4 className="title">{title}</h4>
    //     <p className="desc">{desc}</p>
    //   </div>
    //   <div className="d-flex justify-content-start pb-2 px-2">
    //     {isExistOnCart(id) ? (
    //       <button
    //         onClick={() => navigate("/cart")}
    //         className="btn btn-secondary"
    //       >
    //         Go to cart
    //       </button>
    //     ) : (
    //       <button
    //         onClick={() => addToCart({ title, desc, image, price, id })}
    //         className="btn btn-secondary"
    //       >
    //         Add to cart
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
}

function LazyCard() {
  return (
    <div
      className="card cursor-pointer-parent px-0 col-lg-3 gap-1 col-md-3 col-sm-4 col-6  border"
      aria-hidden="true"
    >
      <img src={placeholderImg} className="card-img-top" alt="..." />
      <div className="card-body">
        <span className="placeholder col-3"></span>
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
        <a
          href="#"
          tabIndex="-1"
          className="btn btn-primary disabled placeholder col-6"
        ></a>
      </div>
    </div>
  );
}
