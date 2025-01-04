  import React from 'react'
  import ContactForm from '../Components/ContactForm'
  import PizzaAboutSection from '../Components/PizzaAboutSection';
  import './screenscss.css'

  const Home = () => {
    const backgroundStyle = {
      backgroundImage: "url('https://i.pinimg.com/236x/84/d9/cf/84d9cf05125bbefd5b443ee772e476b1.jpg')",
      backgroundRepeat: "no-repeat", // Ensure the background scales appropriately
      borderRadius: "0 20px 20px 0", // Rounded corners on the right side
      backgroundSize: "cover",// The width remains the same
      aspectRatio: "16 / 12", // Maintain the aspect ratio dynamically (example: 16:9)
      display: "block",
      // Ensures it behaves like a block-level element
    };
    return (
      <>
        <br />
        <marquee behavior="" direction="" speed="9">
          <p className='font-serif font-extrabold text-2xl'>Hello, Welcome To The  <span className='text-red-600'> Pizza Appetite</span> !!</p>
        </marquee>
        <div className=''>
          <div className="pt-3">

            <br />
            <div className='bg-red-600 flex rounded-xl w-10/12 m-auto h-fit shadow-black shadow-2xl'>
              <div className='w-2/3' style={backgroundStyle}>

                <br /><br /><br />
                <div className='my-3 px-10 text-white text-5xl font-bold'>
                  PizzaAppetite
                </div>
                <div className="text-3xl my-3 px-10 text-white font-bold mt-3">
                  "Your Pizza, Your Way"
                </div>
                <div className=' text-white text-md m-4 px-10 container '>
                  <br />
                  <p className='border-gray-950 rounded-2xl p-3 shadow-black shadow-inner bg-black bg-opacity-60'>
                  There's something magical about pizza that makes it a universal favorite. The perfect blend of a crispy crust, tangy tomato sauce, gooey cheese, and endless topping possibilities satisfies cravings like no other food. Whether it's a classic Margherita, a smoky BBQ Chicken, or a fully-loaded veggie delight, pizza appeals to every palate. 

                  </p>
                </div>
                
              </div>

              <div className=''>
                <div className='m-10 p-10'>
                  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/82cdd550353689.58cebfc537ffb.gif" className='rounded-xl bounce' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br />
        <PizzaAboutSection></PizzaAboutSection>
        <ContactForm></ContactForm>

      </>
    )
  }

  export default Home