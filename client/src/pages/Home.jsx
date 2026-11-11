function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">
          WELCOME TO THE DAILY CUP
        </p>

        <h1>
          Your Daily Dose of
          <span> Happiness.</span>
        </h1>

        <p className="hero-description">
          Enjoy freshly brewed coffee, delicious pastries
          and refreshing drinks. Every cup is made with love.
        </p>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900"
          alt="Freshly brewed coffee"
        />
      </div>
    </section>
  );
}

export default Home;