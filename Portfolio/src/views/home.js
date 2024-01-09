import React from 'react';
import Header from '../components/Header/header';
import Hero from '../components/Hero/hero';
import ProjectCard from '../components/ProjectCard/projectcard';
import Footer from '../components/Footer/footer';

// Dummy data for projects, you can replace this with real data or fetch from an API
const projectsData = [
  {
    id: 1,
    title: 'Project One',
    description: 'This is a brief description of Project One.',
    imageUrl: '/path-to-your-image.jpg', // Replace with the actual path to your project image
    projectUrl: 'http://link-to-project-one.com'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'This is a brief description of Project Two.',
    imageUrl: '/path-to-your-image.jpg', // Replace with the actual path to your project image
    projectUrl: 'http://link-to-project-two.com'
  },
  // ... more projects
];

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <section id="portfolio" className="projects-container">
          {projectsData.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              projectUrl={project.projectUrl}
            />
          ))}
        </section>
        {/* ... any other sections you might want to include */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
