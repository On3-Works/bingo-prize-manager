import Head from 'next/head';
import BingoPrizeCalculator from '../components/BingoPrizeCalculator';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bingo Prize Manager</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-4">
        <BingoPrizeCalculator />
      </main>
    </>
  );
}
