import React from 'react';
import Header from './components/Header/header';
import Hero from './components/Hero/hero';
import ProjectCard from './components/ProjectCard/projectcard';
import Footer from './components/Footer/footer';
import './App.css';

function App() {
  // Placeholder data for projects
  const projects = [
    {
      title: 'Project 1',
      description: 'A brief description of Project 1',
      imageUrl: 'path/to/image1.jpg',
      projectUrl: 'http://project1.com'
    },
    // Add more projects as needed
  ];

  return (
    <div className="App">
      <Header />
      <Hero />
      <section className="projects">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            projectUrl={project.projectUrl}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default App;
