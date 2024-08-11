import { useEffect, useState } from "react";
import useAuth from "../../Utils/Authentication";
import { useUser } from "../../Utils/util";
import "./home.scss";
import { getCategoryList, getProductList } from "../../Api/api";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const { logOut } = useAuth();
  const { userData } = useUser();

  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(3);

  async function fetchMoreData() {
    try {
      setLoading(true)
      const result = await getProductList(category, sort, index);
      setData(result?.data);
      result?.data?.length >= index ? setHasMore(true) : setHasMore(false);
      setIndex((prevIndex) => prevIndex + 3);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  const handleFetchData = async () => {
    try {
      setLoading(true)
      setData([]);
      const result = await getProductList(category, sort, index + 3);
      console.log("data set", result?.data);
      setData(result?.data || []);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const handleFetchCategory = async () => {
    try {
      const result = await getCategoryList();
      console.log(result);
      setCategoryList(result?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {

  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    handleFetchData();
  }, [category, sort]);

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
            <option value="asc">Low to high</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
          <input type="text" placeholder="Search..." className="form-control" />
        </div>
      </div>

      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        endMessage="looks like you reach the end"
        // loader={<Loading />}
      >
        <div className="row justify-content-center gap-2 ">
          {!!data?.length &&
            data.map((x) => (
              <Card
                key={x.id}
                image={x?.image}
                price={x.price}
                title={x.title}
                desc={x.description}
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

function Loading() {
  return (
    <div className="">
      <div className="d-flex gap-3 w-100 justify-content-center align-items-center">
        <LazyCard />
        <LazyCard />
        <LazyCard />
      </div>
    </div>
  );
}

function Card({ title, desc, image, price }) {
  return (
    <div className="card cursor-pointer-parent px-0 col-lg-3 gap-1 col-md-3 col-sm-4 col-6  border">
      <img className="w-100 h-100" src={image} alt="" />
      <div className="px-3">
        <p className="price">${price}</p>
        <h4 className="title">{title}</h4>
        <p className="desc">{desc}</p>
      </div>
      <div className="d-flex justify-content-end pb-2 pe-2">
        <button className="btn btn-secondary">Add to cart</button>
      </div>
    </div>
  );
}

function LazyCard() {
  return (
    <div
      class="card cursor-pointer-parent px-0 col-lg-3 gap-1 col-md-3 col-sm-4 col-6  border"
      aria-hidden="true"
    >
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a
          href="#"
          tabindex="-1"
          class="btn btn-primary disabled placeholder col-6"
        ></a>
      </div>
    </div>
  );
}
