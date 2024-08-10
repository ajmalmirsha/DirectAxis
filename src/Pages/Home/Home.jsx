import useAuth from "../../Utils/Authentication";
import { useUser } from "../../Utils/util";
import "./home.scss";

export default function Home() {
  const { logOut } = useAuth();
  const { userData } = useUser();

  const data = [
    {
      id: 2,
      title: "Classic Red Pullover Hoodie",
      price: 10,
      description:
        "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
      images: [
        "https://i.imgur.com/1twoaDy.jpeg",
        "https://i.imgur.com/FDwQgLy.jpeg",
        "https://i.imgur.com/kg1ZhhH.jpeg",
      ],
      creationAt: "2024-08-09T21:58:25.000Z",
      updatedAt: "2024-08-09T21:58:25.000Z",
      category: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-08-09T21:58:25.000Z",
        updatedAt: "2024-08-09T21:58:25.000Z",
      },
    },
    {
      id: 3,
      title: "Classic Heather Gray Hoodie",
      price: 69,
      description:
        "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
      images: [
        "https://i.imgur.com/cHddUCu.jpeg",
        "https://i.imgur.com/CFOjAgK.jpeg",
        "https://i.imgur.com/wbIMMme.jpeg",
      ],
      creationAt: "2024-08-09T21:58:25.000Z",
      updatedAt: "2024-08-09T21:58:25.000Z",
      category: {
        id: 1,
        name: "Clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2024-08-09T21:58:25.000Z",
        updatedAt: "2024-08-09T21:58:25.000Z",
      },
    },
  ];
  return (
    <div className="container my-5 py-3 h-100">
      <div className="row gap-2 ">
        {!!data?.length &&
          data.map((x) => (
            <Card
              image={x.images[0]}
              price={x.price}
              title={x.title}
              desc={x.description}
            />
          ))}
      </div>
    </div>
  );
}

function Card({ title, desc, image, price }) {
  return (
    <div className="card px-0 col-lg-3 gap-1 col-md-3 col-sm-12  border">
      <img className="w-100" src={image} alt="" />
      <div className="px-3">
        <p className="price">${price}</p>
        <h4 className="title">{title}</h4>
        <p className="desc">{desc}</p>
      </div>
    </div>
  );
}
