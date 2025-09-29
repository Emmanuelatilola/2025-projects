import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



function LandingPage() {
  const [theme, setTheme] = useState('dark')
  const navigate = useNavigate()

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.body.setAttribute('data-theme', savedTheme)
    updateSpotlightEffect(savedTheme)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
    updateSpotlightEffect(newTheme)
  }

  // Update spotlight effect based on theme
  const updateSpotlightEffect = (currentTheme) => {
    const baseColor = currentTheme === 'dark' ? '#000000' : '#ffffff'
    const spotlightColor = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
    
    document.body.style.background = `
      radial-gradient(circle at 50% 50%, ${spotlightColor} 0%, transparent 50%), 
      ${baseColor}
    `
  }

  // Mouse move effect for spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const xPercent = (x / window.innerWidth) * 100
      const yPercent = (y / window.innerHeight) * 100
      
      const baseColor = theme === 'dark' ? '#000000' : '#ffffff'
      const spotlightActive = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
      
      document.body.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, ${spotlightActive} 0%, transparent 50%), 
        ${baseColor}
      `
    }

    const handleMouseLeave = () => {
      updateSpotlightEffect(theme)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [theme])

 
  return (
    <div className="layout">
      <aside className="sidebar fade-in">
        <div className="name">Atilola Emmanuel</div>
        <div className="role">Front-End Developer</div>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="social">
          <a href="#" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/emmanuel-atilola-1a9236224" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <i className={`fa-solid fa-${theme === 'dark' ? 'moon' : 'sun'}`}></i>
        </button>
      </aside>

      <main className="main">
        
         
        
          
            <section id="about" className="section fade-in fade-in-delay-1">
          <h2>About me</h2>
          <p>
            Hi, I'm Emmanuel 👋
            A front-end developer who loves building sleek and responsive web apps.
            I focus on but not limited to React, JavaScript, and Tailwind CSS,
            with a passion for creating interfaces that don't just work 
            but also look beautiful and feel good to interact with.
            I'm always experimenting with new ideas, improving my skills, 
            and bringing designs to life through code.
          </p>
        </section>

        <section id="experience" className="section fade-in fade-in-delay-2">
          <h2>Experience</h2>
          <div className="experience">
          <div className="xp-item">
              <div className="xp-dates">2025 - Present</div>
              <div>
                <div className="xp-role">Freelance Front-End Developer</div>
                <ul className="xp-list">
                  <li>Created and deployed landing pages for small businesses.</li>
                  <li>Optimized website performance and accessibility.</li>
                  <li>Collaborated with clients to translate design ideas into functional websites.</li>
                </ul>
              </div>
            </div>

            <div className="xp-item">
              <div className="xp-dates">2024 - 2025</div>
              <div>
                <div className="xp-role">Frontend Developer(Personal Projects)</div>
                <ul className="xp-list">
                <li>Built responsive web applications using React, JavaScript, and Tailwind CSS.</li>
                <li>Developed a sign-up and login system with client-side validation.</li>
                <li>Designed a portfolio website showcasing projects with modern UI/UX principles.</li>
                <li>Experimented with APIs (e.g., recipe app,) to display real-time data.</li>
                </ul>
              </div>
            </div>
           
          </div>
        </section>

        <section id="projects" className="section fade-in fade-in-delay-3">
          <h2>Projects</h2>
          <div className="projects">

            <article className="project clickable-project" onClick={() => navigate('/recipe')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                <h3>Recipe App</h3>
                <span className="arrow" style={{ fontSize: '1.2rem' }}>→</span>
              </div>
              <p>Discover and explore thousands of recipes from around the world.
                 Search by ingredients, cuisine type, or meal category with detailed
                  cooking instructions and ingredient lists.</p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">CSS3</span>
                <span className="tag">TheMealDB API</span>
                <span className="tag">Responsive</span>
              </div>
            </article>

            <article className="project clickable-project" onClick={() => navigate('/ecothreads')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3>EcoThreads</h3>
                <span className="arrow" style={{ fontSize: '1.2rem' }}>→</span>
              </div>
              <p>A sustainable fashion ecommerce store built with React. Features include product filtering, 
                 shopping cart, wishlist functionality, and responsive design with modern UI/UX.</p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">CSS3</span>
                <span className="tag">Ecommerce</span>
                <span className="tag">Responsive</span>
              </div>
            </article>
            <article className="project clickable-project" onClick={() => navigate('/taskflow')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3>TaskFlow</h3>
                <span className="arrow" style={{ fontSize: '1.2rem' }}>→</span>
              </div>
              <p>Advanced task management app with user authentication, progress tracking, 
                 and personalized dashboard. Features client-side validation and local storage 
                 persistence for a seamless user experience.</p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Authentication</span>
                <span className="tag">Local Storage</span>
                <span className="tag">Responsive</span>
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section fade-in fade-in-delay-4">
          <h2>Contact Me</h2>
          <div className="contact-info">

            <div className="contact-item">
             
              <div className="contact-details">
                <h3> <span> <i className="fa-solid fa-phone"></i> </span> Phone</h3>
                <p>+234 9057501704</p>
              </div>

            </div>

            <div className="contact-item">
             
              <div className="contact-details">
                  <h3> <span> <i className="fa-solid fa-envelope"></i> </span> Email</h3>
                <p>emmanuelatilola9@gmail.com</p>
              </div>

            </div>

          </div>

          <div className="contact-message">
            <p>
              I'm always interested in new opportunities and exciting projects. 
              Kindly reach out !
            </p>
          </div>

        </section>
        
        
      </main>
    </div>
  )
}

export default LandingPage