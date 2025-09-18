import React, { useState } from 'react';
import './ProjectModal.css';
import CADViewer from './CADViewer';
import GalleryModal from './GalleryModal';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isCADViewerOpen, setIsCADViewerOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  
  const openGalleryAtIndex = (index) => {
    setGalleryStartIndex(index);
    setIsGalleryOpen(true);
  };
  
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="modal-header">
          <h2 className="modal-title">{project.title}</h2>
        </div>

        <div className="modal-scroll-container">
          <div className="modal-body">
          {project.detailedDescription && (
            (Array.isArray(project.detailedDescription) && project.detailedDescription.length > 0) ||
            (typeof project.detailedDescription === 'string' && project.detailedDescription.trim() !== "")
          ) && (
            <div className="modal-section">
              <h3>Project Overview</h3>
              <div className="modal-description">
                {Array.isArray(project.detailedDescription) ? (
                  project.detailedDescription.map((paragraph, index) => (
                    <p key={index} className="modal-paragraph">{paragraph}</p>
                  ))
                ) : (
                  project.detailedDescription.split('\n').map((paragraph, index) => (
                    paragraph.trim() !== "" && (
                      <p key={index} className="modal-paragraph">{paragraph.trim()}</p>
                    )
                  ))
                )}
              </div>
            </div>
          )}

          { /* Determine if gallery exists to adjust left column height when absent */ }
          <div className={`modal-grid-two-column ${!(project.gallery && project.gallery.length > 0) ? 'no-gallery' : ''}`}>
            <div className="modal-column">
              {project.modalTechnologies && project.modalTechnologies.length > 0 && (
                <div className="modal-section modal-section-scrollable">
                  <h3>Skills Used</h3>
                  <div className="tech-tags">
                    {project.modalTechnologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-column">
              {(project.duration || project.teamSize) && (
                <div className="modal-section">
                  <h3>Project Details</h3>
                  <div className="project-details">
                    {project.duration && project.duration.trim() !== "" && (
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{project.duration}</span>
                      </div>
                    )}
                    {project.teamSize && project.teamSize.trim() !== "" && (
                      <div className="detail-item">
                        <span className="detail-label">Dates:</span>
                        <span className="detail-value">{project.teamSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="modal-section">
                  <h3>Project Gallery</h3>
                  <div className="gallery-preview">
                    <div className="gallery-thumbnails-preview">
                  {project.gallery.slice(0, 4).map((image, index) => (
                    <div 
                      key={index} 
                      className="gallery-thumbnail-preview"
                      onClick={() => openGalleryAtIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="gallery-thumbnail-image-preview"
                      />
                    </div>
                  ))}
                      {project.gallery.length > 4 && (
                        <button 
                          className="gallery-more-button"
                          onClick={() => openGalleryAtIndex(4)}
                        >
                          <span className="gallery-more-text">+{project.gallery.length - 4}</span>
                        </button>
                      )}
                </div>
              </div>
                </div>
              )}
            </div>
          </div>

          {((project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0)) && (
            <div className="modal-section">
              <h3>Challenges & Solutions</h3>
              <div className="challenges-solutions-paired">
                {Array.from({ length: Math.max(
                  project.challenges ? project.challenges.length : 0,
                  project.solutions ? project.solutions.length : 0
                ) }, (_, index) => (
                  <div key={index} className="challenge-solution-pair">
                    {project.challenges && project.challenges[index] && (
                      <div className="challenge-item">
                        <div className="challenge-icon">⚠️</div>
                        <div className="challenge-content">
                          <h4>Challenge</h4>
                          <p>{project.challenges[index]}</p>
                        </div>
                      </div>
                    )}
                    {project.solutions && project.solutions[index] && (
                      <div className="solution-item">
                        <div className="solution-icon">💡</div>
                        <div className="solution-content">
                          <h4>Solution</h4>
                          <p>{project.solutions[index]}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.results && project.results.length > 0 && (
            <div className="modal-section">
              <h3>Results & Impact</h3>
              <div className="results-grid">
                {project.results.map((result, index) => (
                  <div key={index} className="result-item">
                    <div className="result-icon">✓</div>
                    <span className="result-text">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Sticky Footer with CAD Viewer Button */}
        {project.cadFile && (
          <div className="modal-footer">
            <button 
              className="cad-viewer-button"
              onClick={() => setIsCADViewerOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              View 3D Model
            </button>
          </div>
        )}
      </div>

      {/* CAD Viewer Modal */}
      <CADViewer
        isOpen={isCADViewerOpen}
        onClose={() => setIsCADViewerOpen(false)}
        cadFile={project.cadFile}
        projectTitle={project.title}
      />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={project.gallery}
        projectTitle={project.title}
        initialIndex={galleryStartIndex}
      />
    </div>
  );
};

export default ProjectModal;
