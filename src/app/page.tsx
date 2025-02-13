"use client";
import Footer from "./__components/Footer";
import Navbar from "./__components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <main className="">
        <div
          className="h-screen bg-gradient-to-b from-bgPrimary to-bgSecondary px-5 py-24
                    md:px-24">
          <h1
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent 
             text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center">
            Hack the North 2025
          </h1>
          <h3
            className="text-text text-lg font-bold text-center py-8
                        lg:text-xl xl:text-2xl">
            September 13-15, 2025 • In-person event • MLH Official Member
          </h3>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
