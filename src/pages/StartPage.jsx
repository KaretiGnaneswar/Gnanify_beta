// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/StartingPage/Navbar";
// import Hero from "../components/StartingPage/Hero";
// import Features from "../components/StartingPage/Features";
// import AboutUs from "../components/StartingPage/AboutUs";
// import OurTeam from "../components/StartingPage/OurTeam";
// import Footer from "../components/StartingPage/Footer";
// import AuthModal from "../components/Authentication/AuthModel";
// import HowItWorks from "../components/StartingPage/HowItWorks";
// // import Testimonils from "../components/StartingPage/Testimonils";
// import { Helmet } from "react-helmet-async";
// const StartPage = () => {
//   const [showAuth, setShowAuth] = useState(false);
//   const navigate = useNavigate();

//   const handleAuthClick = () => {
//     setShowAuth(true);
//   };

//   const handleAuthClose = () => {
//     setShowAuth(false);
//   };

//   const handleAuthSuccess = (token) => {
//     if (token) {
//       localStorage.setItem("auth_token", token);
//       navigate("/dashboard", { replace: true });
//     }
//     setShowAuth(false);
//   };


//   return (
//     <div className="bg-gray-900 text-white min-h-screen relative">
//       <Helmet>
//         <title>Gnanify – Learn, Grow, Connect</title>
//         <meta
//           name="description"
//           content="Gnanify – Learn, grow, and connect. Discover courses, blogs, connections, and tools to accelerate your learning journey."
//         />
//         <meta name="robots" content="index,follow" />
//         <meta property="og:type" content="website" />
//         <meta property="og:title" content="Gnanify – Learn, Grow, Connect" />
//         <meta property="og:description" content="Gnanify – Learn, grow, and connect with courses, blogs, and a vibrant community." />
//         <meta property="og:site_name" content="Gnanify" />
//         <meta property="og:url" content="https://gnanify.com/" />
//         <meta name="twitter:card" content="summary" />
//         <meta name="twitter:title" content="Gnanify – Learn, Grow, Connect" />
//         <meta name="twitter:description" content="Gnanify – Learn, grow, and connect with courses, blogs, and a vibrant community." />
//         <link rel="canonical" href="https://gnanify.com/" />
//       </Helmet>
//       {/* Navbar */}
//       <Navbar onLoginClick={handleAuthClick} />

//       {/* Main sections */}
//       <Hero />
//       <Features />
//       <AboutUs />
//         <HowItWorks />
//       <OurTeam />
//       {/* <Testimonils /> */}
//       <Footer />

//       {/* Auth Modal */}
//       {showAuth && (
//         <AuthModal
//           onAuthSuccess={handleAuthSuccess}
//           onClose={handleAuthClose}
//         />
//       )}
//     </div>
//   );
// };

// export default StartPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/StartingPage/Navbar";
import Hero from "../components/StartingPage/Hero";
import Features from "../components/StartingPage/Features";
import AboutUs from "../components/StartingPage/AboutUs";
import OurTeam from "../components/StartingPage/OurTeam";
import Footer from "../components/StartingPage/Footer";
import AuthModal from "../components/Authentication/AuthModel";
import HowItWorks from "../components/StartingPage/HowItWorks";
// import Testimonils from "../components/StartingPage/Testimonils";
import { Helmet } from "react-helmet-async";

const StartPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => setShowAuth(true);
  const handleAuthClose = () => setShowAuth(false);

  const handleAuthSuccess = (token) => {
    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/dashboard", { replace: true });
    }
    setShowAuth(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      <Helmet>
        {/* Basic Meta */}
        <title>Gnanify – Learn, Grow, Connect</title>
        <meta
          name="description"
          content="Gnanify – Learn, grow, and connect. Discover courses, blogs, connections, and tools to accelerate your learning journey."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://gnanify.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gnanify – Learn, Grow, Connect" />
        <meta property="og:description" content="Gnanify – Learn, grow, and connect with courses, blogs, and a vibrant community." />
        <meta property="og:site_name" content="Gnanify" />
        <meta property="og:url" content="https://gnanify.com/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Gnanify – Learn, Grow, Connect" />
        <meta name="twitter:description" content="Gnanify – Learn, grow, and connect with courses, blogs, and a vibrant community." />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Gnanify",
            "url": "https://gnanify.com",
            "logo": "https://gnanify.com/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/gnanify",
              "https://www.youtube.com/@Gnanify"
            ]
          }
          `}
        </script>

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://gnanify.com",
            "name": "Gnanify",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://gnanify.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </script>

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gnanify.com" },
              { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://gnanify.com/about" },
              { "@type": "ListItem", "position": 3, "name": "Our Team", "item": "https://gnanify.com/team" },
              { "@type": "ListItem", "position": 4, "name": "Courses", "item": "https://gnanify.com/courses" },
              { "@type": "ListItem", "position": 5, "name": "Contact Us", "item": "https://gnanify.com/contact" },
              { "@type": "ListItem", "position": 6, "name": "Login / Signup", "item": "https://gnanify.com/login" }
            ]
          }
          `}
        </script>
      </Helmet>

      {/* Navbar */}
      <Navbar onLoginClick={handleAuthClick} />

      {/* Main sections */}
      <Hero />
      <Features />
      <AboutUs />
      <HowItWorks />
      <OurTeam />
      {/* <Testimonils /> */}
      <Footer />

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onAuthSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />
      )}
    </div>
  );
};

export default StartPage;
