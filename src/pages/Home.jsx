import { useLoaderData } from "react-router";
import RecentProdcuts from "../components/recentProducts/RecentProdcuts";

const Home = () => {
  const recentProducts = useLoaderData();

  return (
    <>
      <title>Home - Smart Deals</title>
      <RecentProdcuts recentProducts={recentProducts}></RecentProdcuts>
    </>
  );
};

export default Home;
