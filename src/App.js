import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { portfolioData } from './data/portfolioData';
import ProjectModal from './components/ProjectModal';
import GalleryModal from './components/GalleryModal';
import { FaEllipsisV } from 'react-icons/fa';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [expandedSkills, setExpandedSkills] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedExtracurricular, setSelectedExtracurricular] = useState(null);
  const [isExtracurricularGalleryOpen, setIsExtracurricularGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [expandedExtracurricular, setExpandedExtracurricular] = useState({});
  const data = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      const sections = data.navigation.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.navigation, activeSection]);

  // Universal scroll animation system
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('show')) {
          // Calculate delay based on the element's delay class
          const delayClass = Array.from(entry.target.classList).find(cls => cls.startsWith('animate-delay-'));
          const delay = delayClass ? parseInt(delayClass.split('-')[2]) * 100 : 0; // Convert to milliseconds
          
          // Add show class with the appropriate delay
          setTimeout(() => {
            entry.target.classList.add('show');
          }, delay);
        }
      });
    }, observerOptions);

    // Initialize all elements as hidden
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      el.classList.remove('show');
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Force scroll to top on page load/refresh
  useEffect(() => {
    // Disable scroll restoration to prevent browser from remembering scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Force smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    
    // Additional scroll to top after a short delay to override any browser behavior
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const startStaggeredAnimations = useCallback(() => {
    // Animate name first (step 1)
    setTimeout(() => setAnimationStep(1), 0);
    
    // Animate title second (step 2)
    setTimeout(() => setAnimationStep(2), 600);
    
    // Animate tagline third (step 3)
    setTimeout(() => setAnimationStep(3), 1200);
    
    // Animate buttons last (step 4)
    setTimeout(() => setAnimationStep(4), 1800);
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowContent(true);
    // Show scroll arrow immediately when video ends
    setShowScrollArrow(true);
  };

  const handleVideoTimeUpdate = useCallback((e) => {
    const video = e.target;
    const duration = video.duration;
    const currentTime = video.currentTime;
    const animationStartPercent = data.personalInfo.animationStartPercent || 10;
    
    // Start animations when video reaches the specified percentage
    if (currentTime >= duration * (animationStartPercent / 100) && !showContent) {
      setShowContent(true);
      startStaggeredAnimations();
    }
    
    // Show scroll arrow when video is 90% complete
    if (currentTime >= duration * 0.9 && !showScrollArrow) {
      setShowScrollArrow(true);
    }
  }, [showContent, showScrollArrow, startStaggeredAnimations, data.personalInfo.animationStartPercent]);

  const handleVideoError = () => {
    // If video fails to load, show content immediately
    setVideoEnded(true);
    setShowContent(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const openExtracurricularGalleryAtIndex = (activity, index) => {
    setSelectedExtracurricular(activity);
    setGalleryStartIndex(index);
    setIsExtracurricularGalleryOpen(true);
  };

  const handleCloseExtracurricularGallery = () => {
    setIsExtracurricularGalleryOpen(false);
    setSelectedExtracurricular(null);
  };

  const toggleExtracurricular = (activityId) => {
    setExpandedExtracurricular(prev => {
      // Close all other cards first, then toggle the clicked one
      const newState = {};
      newState[activityId] = !prev[activityId];
      return newState;
    });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDescription = (companyId, positionId) => {
    const key = `${companyId}-${positionId}`;
    setExpandedDescriptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleSkills = (companyId, positionId) => {
    const key = `${companyId}-${positionId}`;
    setExpandedSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDownloadPortfolio = () => {
    // Create a link element to download the PDF
    const link = document.createElement('a');
    link.href = '/pdfs/portfolio.pdf'; // Path to PDF in public/pdfs folder
    link.download = `vaibhav_kumar_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);



  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2 onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>{data.personalInfo.name}</h2>
          </div>
          <div className="nav-right">
            <ul className="nav-menu">
              {data.navigation.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={activeSection === item.id ? 'active' : ''} 
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="dropdown-container">
              <button className="three-dot-menu" onClick={handleDropdownToggle}>
                <FaEllipsisV />
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={handleDownloadPortfolio}>
                    Download Resume
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section id="home" className="hero">
        {/* Video Background */}
        <div className="hero-video-container">
          <video
            className={`hero-video ${videoEnded ? 'frozen' : ''}`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onTimeUpdate={handleVideoTimeUpdate}
            onError={handleVideoError}
            poster={data.personalInfo.heroImage}
          >
            <source src={data.personalInfo.heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay */}
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className={`hero-name ${animationStep >= 1 ? 'show' : ''}`}>{data.personalInfo.name}</h1>
          <h2 className={`hero-title ${animationStep >= 2 ? 'show' : ''}`}>{data.personalInfo.title}</h2>
          <p className={`hero-tagline ${animationStep >= 3 ? 'show' : ''}`}>{data.personalInfo.tagline}</p>
          <div className={`hero-buttons ${animationStep >= 4 ? 'show' : ''}`}>
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">View My Work</button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">Get In Touch</button>
          </div>
        </div>

        {/* Scroll Arrow */}
        {showScrollArrow && (
          <div className="scroll-arrow-container">
            <div className="scroll-arrow" onClick={() => scrollToSection('about')}>
              <div className="scroll-arrow-circle">
                <svg className="scroll-arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 5L12 10L17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">About Me</h2>
          <div className="about-content">
            <div className="about-image">
              <div className="profile-placeholder animate-on-scroll animate-delay-2">
                {data.personalInfo.profileImageUrl ? (
                  <img 
                    src={data.personalInfo.profileImageUrl} 
                    alt={data.personalInfo.name}
                    onLoad={() => console.log('Profile image loaded successfully:', data.personalInfo.profileImageUrl)}
                    onError={(e) => {
                      console.log('Profile image failed to load:', data.personalInfo.profileImageUrl);
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      const iconSpan = parent.querySelector('.profile-icon-fallback');
                      if (iconSpan) {
                        iconSpan.style.display = 'block';
                      }
                    }}
                  />
                ) : null}
                <div 
                  className="profile-icon-fallback" 
                  style={{ display: data.personalInfo.profileImageUrl ? 'none' : 'block' }}
                >
                  {data.personalInfo.profileImage}
                </div>
              </div>
            </div>
            <div className="about-text">
              {Object.entries(data.about)
                .filter(([key, value]) => key.startsWith('description'))
                .map(([key, value], index) => (
                  <p key={key} className={`animate-on-scroll animate-delay-${index + 3}`}>
                    {value}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">Featured Projects</h2>
          <div className="projects-grid">
            {data.projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card animate-on-scroll animate-delay-${Math.min(index + 1, 6)}`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <div className="project-placeholder">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        onLoad={() => console.log('Image loaded successfully:', project.imageUrl)}
                        onError={(e) => {
                          console.log('Image failed to load:', project.imageUrl);
                          // Hide the image and show icon instead
                          e.target.style.display = 'none';
                          // Find the parent container and show the icon
                          const parent = e.target.parentElement;
                          const iconSpan = parent.querySelector('.project-icon-fallback');
                          if (iconSpan) {
                            iconSpan.style.display = 'block';
                          }
                        }}
                      />
                    ) : null}
                    <span 
                      className="project-icon-fallback" 
                      style={{ display: project.imageUrl ? 'none' : 'block' }}
                    >
                      {project.icon}
                    </span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex}>{tech}</span>
                    ))}
                    {project.modalTechnologies && project.modalTechnologies.length > project.technologies.length && (
                      <span className="tech-ellipsis">...</span>
                    )}
                  </div>
                  <div className="project-click-hint">
                    Click to learn more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">Technical Skills</h2>
          <div className="skills-content">
            {data.skills.map((category, categoryIndex) => (
              <div key={categoryIndex} className={`skills-category animate-on-scroll animate-delay-${categoryIndex + 2}`}>
                <h3>{category.category}</h3>
                <div className="skill-items">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-item">
                      <span>{skill.name}</span>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{width: `${skill.level}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="resume">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">Experience & Education</h2>
          <div className="resume-content">
            <div className="resume-section animate-on-scroll animate-delay-2">
              <h3>Professional Experience</h3>
              <div className="experience-timeline">
                {data.experience
                  .sort((a, b) => {
                    // Get the most recent position date for each company
                    const getMostRecentDate = (company) => {
                      const dates = company.positions.map(pos => {
                        // Extract year from period string (e.g., "Jan 2023 - Present" or "2022 - Present")
                        const yearMatch = pos.period.match(/(\d{4})/);
                        return yearMatch ? parseInt(yearMatch[1]) : 0;
                      });
                      return Math.max(...dates);
                    };
                    
                    const dateA = getMostRecentDate(a);
                    const dateB = getMostRecentDate(b);
                    return dateB - dateA; // Sort descending (most recent first)
                  })
                  .map((company, companyIndex) => (
                  <div key={company.id} className={`company-group animate-on-scroll animate-delay-${companyIndex + 3}`}>
                    <div className="company-header">
                      <div className="company-logo">
                        {company.companyLogo ? (
                          <img src={company.companyLogo} alt={`${company.company} logo`} />
                        ) : (
                          <div className="company-logo-placeholder">
                            {company.company.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="company-info">
                        <h4 className="company-name">{company.company}</h4>
                        <div className="company-meta">
                          <span className="employment-type">{company.employmentType}</span>
                          <span className="duration">{company.totalDuration}</span>
                        </div>
                        <div className="company-location">{company.location}</div>
                      </div>
                    </div>
                    <div className="positions-container">
                      {company.positions.map((position, positionIndex) => (
                        <div key={position.id} className={`position-item ${positionIndex > 0 ? 'position-subsequent' : ''}`}>
                          <div className="position-timeline">
                            <div className="timeline-dot"></div>
                            {positionIndex < company.positions.length - 1 && <div className="timeline-line"></div>}
                          </div>
                          <div className="position-content">
                            <div className="position-header">
                              <h5 className="position-title">{position.title}</h5>
                              <div className="position-dates">
                                <span className="position-period">{position.period}</span>
                                <span className="position-duration">{position.duration}</span>
                              </div>
                            </div>
                            <div className="position-description">
                              {Array.isArray(position.description) ? (
                                <div className="description-list">
                                  {position.description.slice(0, 2).map((item, index) => (
                                    <div key={index} className="description-item">
                                      <span className="bullet-point">•</span>
                                      <span className="description-text">{item}</span>
                                    </div>
                                  ))}
                                  {position.description.length > 2 && (
                                    <>
                                      <div className={`description-expanded ${expandedDescriptions[`${company.id}-${position.id}`] ? 'show' : ''}`}>
                                        {position.description.slice(2).map((item, index) => (
                                          <div key={index + 2} className="description-item">
                                            <span className="bullet-point">•</span>
                                            <span className="description-text">{item}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <button 
                                        className="description-toggle"
                                        onClick={() => toggleDescription(company.id, position.id)}
                                      >
                                        {expandedDescriptions[`${company.id}-${position.id}`] ? 'Show Less' : `Show ${position.description.length - 2} More`}
                                      </button>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <p>{position.description}</p>
                              )}
                            </div>
                            {position.skills && position.skills.length > 0 && (
                              <div className="position-skills">
                                <div className="skills-icon">💎</div>
                                <div className="skills-container">
                                  <div className="skills-list">
                                    {position.skills.slice(0, 3).map((skill, skillIndex) => (
                                      <span key={skillIndex} className="skill-tag">{skill}</span>
                                    ))}
                                    {position.skills.length > 3 && (
                                      <button 
                                        className="skill-more-button"
                                        onClick={() => toggleSkills(company.id, position.id)}
                                      >
                                        {expandedSkills[`${company.id}-${position.id}`] ? 'Show Less' : `+${position.skills.length - 3} skills`}
                                      </button>
                                    )}
                                  </div>
                                  {position.skills.length > 3 && (
                                    <div className={`skills-expanded ${expandedSkills[`${company.id}-${position.id}`] ? 'show' : ''}`}>
                                      <div className="skills-list-expanded">
                                        {position.skills.slice(3).map((skill, skillIndex) => (
                                          <span key={skillIndex + 3} className="skill-tag">{skill}</span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="resume-section animate-on-scroll animate-delay-3">
              <h3>Education</h3>
              {data.education.map((edu, index) => (
                <div key={edu.id} className={`education-item animate-on-scroll animate-delay-${index + 4}`}>
                  <h4>{edu.degree}</h4>
                  <h5>{edu.institution} ({edu.period})</h5>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>

            <div className="resume-section animate-on-scroll animate-delay-4">
              <h3>Certifications</h3>
              <div className="certifications">
                {data.certifications.map((cert, index) => (
                  <div key={index} className={`cert-item animate-on-scroll animate-delay-${index + 5}`}>{cert}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider">
        <div className="container">
          <div className="divider-content">
            <div className="divider-line"></div>
            <h3 className="divider-title">Beyond Professional Work</h3>
            <div className="divider-line"></div>
          </div>
        </div>
      </div>

      {/* Extracurricular Section */}
      <section id="extracurricular" className="extracurricular">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">Extracurricular Activities</h2>
          <div className="extracurricular-content">
            {[0, 1, 2].map(columnIndex => (
              <div key={columnIndex} className="extracurricular-column">
                {data.extracurricular
                  .filter((_, index) => index % 3 === columnIndex)
                  .map((activity, index) => (
                    <div key={activity.id} className={`extracurricular-item animate-on-scroll animate-delay-${(columnIndex * 3) + index + 2}`}>
                      <div className="extracurricular-header">
                        <h3>{activity.title}</h3>
                        <div className="extracurricular-meta">
                          <span className="extracurricular-role">{activity.role}</span>
                          <span className="extracurricular-period">{activity.period}</span>
                        </div>
                      </div>
                      <p className="extracurricular-description">{activity.description}</p>
                      <div className={`extracurricular-details ${expandedExtracurricular[activity.id] ? 'show' : ''}`}>
                        {activity.achievements && activity.achievements !== "" && (
                          <div className="extracurricular-achievements">
                            <h4>Key Achievements:</h4>
                            <ul>
                              {activity.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {activity.gallery && activity.gallery.length > 0 && (
                          <div className="extracurricular-gallery">
                            <h4>Gallery</h4>
                            <div className="gallery-preview">
                              <div className="gallery-thumbnails-preview">
                                {activity.gallery.slice(0, 4).map((image, imageIndex) => {
                                  const isVideo = image && (image.endsWith('.mp4') || image.endsWith('.webm') || image.endsWith('.ogg') || image.endsWith('.mov'));
                                  
                                  return (
                                    <div 
                                      key={imageIndex} 
                                      className="gallery-thumbnail-preview"
                                      onClick={() => openExtracurricularGalleryAtIndex(activity, imageIndex)}
                                    >
                                      {isVideo ? (
                                        <video 
                                          src={image} 
                                          className="gallery-thumbnail-image-preview"
                                          muted
                                          autoPlay
                                          loop
                                          playsInline
                                          preload="metadata"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                            const parent = e.target.parentElement;
                                            const iconSpan = parent.querySelector('.gallery-icon-fallback');
                                            if (iconSpan) {
                                              iconSpan.style.display = 'flex';
                                            }
                                          }}
                                        />
                                      ) : (
                                        <img 
                                          src={image} 
                                          alt={`${activity.title} ${imageIndex + 1}`}
                                          className="gallery-thumbnail-image-preview"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                            const parent = e.target.parentElement;
                                            const iconSpan = parent.querySelector('.gallery-icon-fallback');
                                            if (iconSpan) {
                                              iconSpan.style.display = 'flex';
                                            }
                                          }}
                                        />
                                      )}
                                      <div 
                                        className="gallery-icon-fallback" 
                                        style={{ display: 'none' }}
                                      >
                                        📷
                                      </div>
                                    </div>
                                  );
                                })}
                                {activity.gallery.length > 4 && (
                                  <button 
                                    className="gallery-more-button"
                                    onClick={() => openExtracurricularGalleryAtIndex(activity, 4)}
                                  >
                                    <span className="gallery-more-text">+{activity.gallery.length - 4}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                            <button 
                              className="gallery-view-button"
                              onClick={() => openExtracurricularGalleryAtIndex(activity, 0)}
                            >
                              View Full Gallery ({activity.gallery.length} photos)
                            </button>
                          </div>
                        )}
                      </div>
                      <button 
                        className="extracurricular-toggle"
                        onClick={() => toggleExtracurricular(activity.id)}
                      >
                        {expandedExtracurricular[activity.id] ? 'Show Less' : 'Show Details'}
                      </button>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="animate-on-scroll animate-delay-1">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-card animate-on-scroll animate-delay-2">
              <div className="contact-info">
                <h3>Let's Connect</h3>
                <p>I'm always interested in new opportunities and exciting projects. Feel free to reach out!</p>
              </div>
              <div className="contact-details">
                <div className="contact-item animate-on-scroll animate-delay-3">
                  <span className="contact-icon">📧</span>
                  <span>{data.personalInfo.email}</span>
                </div>
                <div className="contact-item animate-on-scroll animate-delay-4">
                  <span className="contact-icon">📍</span>
                  <span>{data.personalInfo.location}</span>
                </div>
              </div>
              <div className="social-links animate-on-scroll animate-delay-5">
                <a href={data.personalInfo.socialLinks.linkedin} className="social-link">LinkedIn</a>
                <a href={data.personalInfo.socialLinks.github} className="social-link">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 {data.personalInfo.name}.</p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Extracurricular Gallery Modal */}
      <GalleryModal 
        isOpen={isExtracurricularGalleryOpen}
        onClose={handleCloseExtracurricularGallery}
        images={selectedExtracurricular?.gallery || []}
        projectTitle={selectedExtracurricular?.title || ''}
        initialIndex={galleryStartIndex}
      />

    </div>
  );
}

export default App;