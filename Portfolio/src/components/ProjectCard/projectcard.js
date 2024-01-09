import React from 'react';
import './projectcard.css';

const ProjectCard = ({ title, description, imageUrl, projectUrl }) => {
    return (
        <div className="project-card">
            <img src={imageUrl} alt={title} className="project-image" />
            <div className="project-info">
                <h3>{title}</h3>
                <p>{description}</p>
                <a href={projectUrl} className="project-link">View Project</a>
            </div>
        </div>
    );
}

export default ProjectCard;
