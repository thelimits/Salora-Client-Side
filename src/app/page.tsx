import Banner from "@/Pages/Banner";
import CardSectionNewItems from "@/Pages/CardSectionNewItems";

interface HomeProps {
  products: Product[]; 
}

const Home: React.FC<HomeProps> = () => {
  return (
    <main className="flex min-h-0 flex-col">
      <Banner />
      <CardSectionNewItems category={"pria"} />
    </main>
  );
};

export default Home;
