import React, { useState, useEffect } from 'react';

const PizzaAboutSection = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("pizza-about-section");
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setInView(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="pizza-about-section" className="py-20 bg-red-500 text-white">
      <div className="max-w-full mx-auto px-6 md:px-12"> {/* Increased width */}
        <div className={`flex flex-col md:flex-row-reverse gap-16 ${inView ? 'opacity-100 animate-fadeIn' : 'opacity-0'}`}>
          
          {/* Right Column - Pizza Image */}
          <div className="flex justify-center items-center relative md:w-[30%]"> {/* Image width set here */}
            <img
              src="https://i.pinimg.com/474x/f2/f0/18/f2f018bb6e32fba1ca84ff391bc9a69a.jpg"
              alt="Pizza"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover transform transition-all duration-500 hover:scale-110 hover:rotate-3"
            />
          </div>

          {/* Left Column - Pizza Store Information */}
          <div className="flex flex-col justify-center w-full md:w-[70%]"> {/* Text width set here */}
            <h2 className="text-4xl font-bold mb-6 text-white leading-tight tracking-wide animate-slideInLeft">
              Discover the Best Pizza in Town!
            </h2>
            <p className="text-lg leading-relaxed mb-4 opacity-90">
              At our pizza store, we bring you the finest pizzas, made with fresh ingredients, traditional recipes, and a love for good food. Whether you're craving a classic Margherita or a fully loaded meat-lover's pizza, we have something to delight every palate.
            </p>
            <p className="text-lg leading-relaxed mb-4 opacity-90">
              Our chefs take pride in every pie, carefully preparing each pizza from scratch with premium toppings and quality dough. We deliver piping hot pizzas right to your door, so you can enjoy restaurant-quality food in the comfort of your home!
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              Ready to experience our mouth-watering pizzas? Order now and indulge in the best pizza you've ever tasted!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaAboutSection;
