const AckPage = () => {
  return (
    <main className="flex flex-col min-h-screen container mx-auto p-4">
      <div className="flex-grow text-slate-200 text-center mb-16">
        <p className="text-4xl font-bold mb-6">Special Thanks To:</p>
        <ul className="space-y-4">
          <li className="text-3xl font-semibold transition duration-300 hover:scale-110 hover:text-white">
            Mr. Kennedy
          </li>
          <li className="text-3xl font-semibold transition duration-300 hover:scale-110 hover:text-white">
            Alex Michos
          </li>
          <li className="text-3xl font-semibold transition duration-300 hover:scale-110 hover:text-white">
            ❤️ Alex Luo ❤️
          </li>
          <li className="text-md font-semibold transition duration-300 hover:scale-110 hover:text-white">
            website by Thomas Li
          </li>
        </ul>
      </div>
    </main>
  );
};

export default AckPage;
