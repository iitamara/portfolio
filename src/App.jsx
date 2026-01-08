
import './App.css'

function App() {
  return (
    <>
      <header className="hero" id="home">
        <div className="container">
          <p className="kicker">ICT Student • Web / Full-Stack</p>
          <h1>Your Name</h1>
          <p className="subtitle">
            I build modern web apps with React. Currently sharpening my full-stack skills.
          </p>
          <div className="heroActions">
            <a className="btn" href="#projects">See my work</a>
            <a className="btnSecondary" href="#contact">Get in touch</a>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="container navInner">

          <div className="navLinks">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>

            {/* CV button placeholder (no functionality yet) */}
            <button
              className="btnSmall"
              type="button"
              onClick={() => alert("CV download will be added soon.")}
            >
              Download CV
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="section" id="about">
          <div className="container grid2">
            <div className="card">
              <h2>About me</h2>
              <p>
                Short summary about me. What I'm learning (full stack), what I enjoy building,
                and what internship I'm looking for.
              </p>
              <p className="muted">
                (Later I can add a dedicated About page. For now, keep it tight and readable.)
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container grid2">
            <div className="card">
              <h3>Tech I use</h3>
              <div className="tags">
                <span>HTML</span><span>CSS</span><span>JavaScript</span><span>React</span>
                <span>TypeScript</span><span>Git</span>
              </div>
            </div>

            <div className="card">
              <h3>Tech I use</h3>
              <div className="tags">
                <span>HTML</span><span>CSS</span><span>JavaScript</span><span>React</span>
                <span>TypeScript</span><span>Git</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <div className="sectionHeader">
              <h2>Featured projects</h2>
              <p className="muted">Three best projects here. Add more later on a Projects page.</p>
            </div>

            <div className="cards3">
              <article className="card">
                <h3>Project 1</h3>
                <p className="muted">Description here.</p>
                <div className="tags">
                  <span>React</span><span>CSS</span>
                </div>
                <div className="cardActions">
                  <a href="#" onClick={(e)=>e.preventDefault()}>See full project</a>
                </div>
              </article>

              <article className="card">
                <h3>Project 2</h3>
                <p className="muted">Description here.</p>
                <div className="tags">
                  <span>JavaScript</span><span>API</span>
                </div>
                <div className="cardActions">
                  <a href="#" onClick={(e)=>e.preventDefault()}>See full project</a>
                </div>
              </article>

              <article className="card">
                <h3>Project 3</h3>
                <p className="muted">Description here.</p>
                <div className="tags">
                  <span>Full stack</span><span>Node</span>
                </div>
                <div className="cardActions">
                  <a href="#" onClick={(e)=>e.preventDefault()}>See full project</a>
                </div>
              </article>
            </div>

            <div style={{ marginTop: 16 }}>
              <a className="btnSecondary" href="#projects" onClick={(e)=>e.preventDefault()}>
                Show all (coming soon)
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <h2>Contact</h2>
            <p className="muted">
              Add phone + email + LinkedIn/GitHub here. contact form coming.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="muted">© {new Date().getFullYear()} Name</p>
        </div>
      </footer>
    </>
  );
}

export default App
