import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center mt-20 justify-center p-4">
      <div className="bg-teal-100  rounded-lg overflow-hidden max-w-4xl border border-gray-500 shadow-6xl w-full p-8">
        {/* అవతార్ మరియు టైటిల్ */}
        <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden">
        <img
            src="images/venkat1.png" // Replace with your image URL
            alt="Avatar"
            className="w-full h-full object-cover"
            
        />
        
        </div>
        <p className="text-xl font-bold text-gray-800 text-black-700 mb-4">Fullstack Developer</p>
          <h1 className="text-xl  text-gray-800">About Me</h1>
        </div>

        {/* కంటెంట్ */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4 text-justify">
          I have completed my B.Tech in Mechanical Engineering from S.V. University and my M.Tech in
           Mechanical Engineering from Karnataka State University. 
          currently, I am working as a junior lecturer at SKR Govt Junior College, Gudur, Tirupati DT.
          I am interested in coding and am familiar with HTML, CSS, and JavaScript for frontend development, 
          as well as Node.js, Django, and Express.js for backend development. 
          Additionally, I have experience working with databases like MySQL and MongoDB.
          </p>
          <p className="text-lg text-gray-700 text-justify">
          My goal is to become a full-stack developer. I have completed several projects, 
          including school management and college management apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;