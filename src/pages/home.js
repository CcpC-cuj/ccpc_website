import React, { } from "react";
import NAVBAR from "../components/NavbarHome";
import STARFIELD from "../components/Starfield";
import Footer from "../components/Footer";
import Logo from "../components/logo/logo";
import Title from "../components/homecontent/Title";
import WhyCCPC from "../components/homecontent/WhyCCPC"; 
import SoC from "../components/homecontent/Soc"; 
import TEAM from "../components/SEB/Team2025";
import UpcomingEvents from "../components/homecontent/UpcomingEvents"; 
const Home = () => {
  return (
    <div className="relative">
      <STARFIELD />
      <div className="relative z-10">
        <NAVBAR />
        <div className="flex flex-col justify-center items-center min-h-[70vh] lg:min-h-screen">
          <div className="fixed-width text-center">
            <Title text="Code Crafters Programming Club" />
          </div>
        </div>

        <div className="mt-6 text-center px-4 lg:px-16 flex lg:flex-row flex-col items-center justify-center">
          <div className="flex justify-center items-start mt-8">
            <Logo />
          </div>
          <div className="bg-blue-500/20 backdrop-blur-md text-s lg:text-xl mt-3 lg:ml-10 rounded-lg text-left p-6 lg:p-10">
            <div>
              <p className="text-gray-300 leading-relaxed">
                Code Crafters Programming Club is an exciting initiative designed to ignite a passion for coding within our institution.
                Our mission is to provide students with a gateway to the dynamic world of programming, offering a supportive platform where assistance and mentorship are readily available.
                Whether you're just starting or looking to refine your skills, we're here to help you unlock your potential and enhance your coding abilities.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                At Code Crafters, we believe coding is a skill everyone should have the opportunity to learn. Our motto is simple:
                <span className="font-semibold text-yellow-500"> "Innovate. Collaborate. Elevate."</span>
                Join us as we provide every student with the right tools, guidance, and community to embark on this exciting journey.
              </p>
            </div>
          </div>
        </div>

        <WhyCCPC />
        <UpcomingEvents />
        <SoC />
        <TEAM />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
