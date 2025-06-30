import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';
import Works from '../components/Works';
import Recommendations from '../components/Recommendations';

// Placeholder background images
import bg1 from '../images/1.png';
import bg2 from '../images/2.png';
import bg3 from '../images/3.png';

export default function Layout({ children }) {
  const scrollConfig = {
    spy: true,
    smooth: true,
    offset: -50,
    duration: 300
  };

  const SectionWrapper = ({ id, bgImage, children }) => (
    <div 
      id={id}
      className="min-h-screen relative"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link 
              to="profile-container" 
              {...scrollConfig}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300 cursor-pointer"
            >
              Agni Pamungkas
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="profile-container" {...scrollConfig} className="nav-link">
                Profile
              </Link>
              <Link to="works-container" {...scrollConfig} className="nav-link">
                Works
              </Link>
              <Link to="testimonials-container" {...scrollConfig} className="nav-link">
                Testimonials
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <SectionWrapper id="profile-container" bgImage={bg1}>
        {children}
      </SectionWrapper>

      {/* Works Section */}
      <SectionWrapper id="works-container" bgImage={bg2}>
        <Works />
      </SectionWrapper>

      {/* Testimonials Section */}
      <SectionWrapper id="testimonials-container" bgImage={bg3}>
        <Recommendations />
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Agni Pamungkas
              </h3>
              <p className="text-gray-300 mt-2">
                Full-stack developer crafting modern web experiences
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://github.com/yourusername" className="hover:text-white transition-colors">
                <FiGithub className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/yourprofile" className="hover:text-white transition-colors">
                <FiLinkedin className="w-6 h-6" />
              </a>
              <a href="mailto:agnipamungkas@gmail.com" className="hover:text-white transition-colors">
                <FiMail className="w-6 h-6" />
              </a>
              <a href="tel:08996846150" className="hover:text-white transition-colors">
                <FiPhone className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Agni Pamungkas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
