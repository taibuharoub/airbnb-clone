import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header  */}
      <Header />

      {/* Banner  */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* pull some data from a server - API endpoint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={item.img}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    // alternative url: https://links.papareact.com/pyp
    const data = await fetch("https://jsonkeeper.com/b/4G1G");
    const exploreData = await data.json();

    // alternative url: https://links.papareact.com/zp1
    const cardsData = await fetch("https://jsonkeeper.com/b/VHHT").then((res) =>
      res.json()
    );
    return {
      props: {
        exploreData,
        cardsData,
      },
    };
  } catch (error) {
    console.log(error.message);
  }
  // return {
  //   props: {
  //     exploreData,
  //   },
  // };
}
