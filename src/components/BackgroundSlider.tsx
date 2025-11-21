const BackgroundSlider = () => {
  // Background image slider component
  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/bg.png)` }}
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};

export default BackgroundSlider;