import React from "react";
import HeroSlider from "../components/slider/HeroSlider";
import Helmet from "../components/Helmet";
import Section from "../components/section/Section";
import Grid from "../components/Grid";
import PolicyCard from "../components/policyCard/PolicyCard";
import Banner from "../components/banner/Banner";
import Collections from "../components/collections/Collections";


const Home = () => {
  const policy = [
    {
      name: "Miễn phí giao hàng",
      description: "Miễn phí giao hàng với đơn hàng > 239K",
      icon: "bx bx-shopping-bag",
    },
    {
      name: "Thanh toán COD",
      description: "Thanh toán khi nhận hàng (COD)",
      icon: "bx bx-credit-card",
    },
    {
      name: "Khách hàng VIP",
      description: "Ưu đãi dành cho khách hàng VIP",
      icon: "bx bx-diamond",
    },
  ];


  return (
    <Helmet title="Home">
      <HeroSlider />
      <div style={{ margin: "50px 50px"}}>
        <Grid col={3} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <PolicyCard key={index} product={item}/>
            ))}
        </Grid>
      </div>
      <>
        <Collections />
      </>
      <>
        <Section title="New Arrivals" />
      </>
      <>
        <Section title="Best Sellers" />
      </>
      <>
        <Banner />
      </>
      <>
        <Section title="New Trends" />
      </>
    </Helmet>
  );
};

export default Home;
