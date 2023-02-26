import FilesList from '@/app/components/home/files/filesList';
import Hero from '@/app/components/home/hero/hero';
import Tags from '@/app/components/home/tags/tags';

const Home = () => {
  return (
    <main>
      <Hero />
      <Tags />
      <FilesList />
    </main>
  );
};

export default Home;
