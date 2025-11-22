const Header = () => {
  return (
    <div className="absolute inset-x-0 top-8 md:top-16 z-10 flex flex-col items-center pointer-events-none">
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-rose-400 to-orange-200 drop-shadow-sm">
        Travel Planner
      </h1>
      <p className="mt-2 md:mt-4 text-white text-xl md:text-3xl font-medium tracking-wide drop-shadow-md">旅遊規劃器</p>
    </div>
  );
};

export default Header;
