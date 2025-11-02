'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light'|'dark'>('dark')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
    // if nothing stored, keep initial 'dark' (no system pref override)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
      // optional: add class to html for global styling if needed
      document.documentElement.dataset.theme = theme
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const isLight = theme === 'light'
  const bgClass = isLight ? 'bg-white' : 'bg-red-900'
  const pageText = isLight ? 'text-black' : 'text-white'
  const muted = isLight ? 'text-black/60' : 'text-white/70'
  const cardBg = isLight ? 'bg-gray-50' : 'bg-white/10'
  const border = isLight ? 'border-black/10' : 'border-black/20'
  // When dark mode, invert and boost contrast so monochrome SVG logos become white
  const iconFilter = isLight ? '' : 'filter invert contrast-125'

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.querySelector(targetId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${bgClass}`}>
      <div className="absolute inset-0 opacity-15 pointer-events-none grain-texture" />

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 sm:px-6 md:px-6 py-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className={`text-lg font-mono font-bold ${pageText}`}>Erion Ismajli</div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className={`${pageText} hover:underline font-mono text-sm transition-all duration-200`}>.getAbout()</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className={`${pageText} hover:underline font-mono text-sm transition-all duration-200`}>.skills()</a>
            <a href="#xp" onClick={(e) => handleNavClick(e, '#xp')} className={`${pageText} hover:underline font-mono text-sm transition-all duration-200`}>.xp()</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className={`${pageText} hover:underline font-mono text-sm transition-all duration-200`}>.projects()</a>
            <a href="#timeline" onClick={(e) => handleNavClick(e, '#timeline')} className={`${pageText} hover:underline font-mono text-sm transition-all duration-200`}>.trainings()</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-md border ${border} ${cardBg} flex items-center justify-center transition`}
              title={isLight ? 'Switch to dark' : 'Switch to light'}
            >
              {isLight ? (
                <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M3 12h2M19 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
              ) : (
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className={`${isLight ? 'text-black' : 'text-white'} md:hidden p-2 rounded-md hover:bg-black/10`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile nav: full-screen overlay + slide-down panel */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* panel */}
            <div className="absolute top-0 left-0 right-0 transform transition-transform duration-300">
              <div className={`${cardBg} border-b ${border} px-6 py-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div className={`text-lg font-mono font-bold ${pageText}`}>Menu</div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleTheme}
                      aria-label="Toggle theme"
                      className={`p-2 rounded-md border ${border} ${cardBg} flex items-center justify-center`}
                      title={isLight ? 'Switch to dark' : 'Switch to light'}
                    >
                      {isLight ? (
                        <svg className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M3 12h2M19 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                      )}
                    </button>

                    <button
                      onClick={() => setMenuOpen(false)}
                      aria-label="Close menu"
                      className={`p-2 rounded-md border ${border} ${cardBg} flex items-center justify-center`}
                    >
                      <svg className={`${isLight ? 'text-black' : 'text-white'} w-5 h-5`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <nav className="mt-6 flex flex-col gap-4">
                  <a onClick={(e) => handleNavClick(e, '#home')} href="#home" className={`block px-4 py-3 rounded-lg text-base font-semibold ${pageText} hover:underline`}>.getAbout()</a>
                  <a onClick={(e) => handleNavClick(e, '#skills')} href="#skills" className={`block px-4 py-3 rounded-lg text-base font-semibold ${pageText} hover:underline`}>.skills()</a>
                  <a onClick={(e) => handleNavClick(e, '#xp')} href="#xp" className={`block px-4 py-3 rounded-lg text-base font-semibold ${pageText} hover:underline`}>.xp()</a>
                  <a onClick={(e) => handleNavClick(e, '#projects')} href="#projects" className={`block px-4 py-3 rounded-lg text-base font-semibold ${pageText} hover:underline`}>.projects()</a>
                  <a onClick={(e) => handleNavClick(e, '#timeline')} href="#timeline" className={`block px-4 py-3 rounded-lg text-base font-semibold ${pageText} hover:underline`}>.trainings()</a>
                </nav>

                <div className="mt-6 border-t pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/erionismajli" target="_blank" rel="noreferrer" className={`w-10 h-10 ${cardBg} rounded-md border ${border} flex items-center justify-center ${pageText}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/erion-ismajli/" target="_blank" rel="noreferrer" className={`w-10 h-10 ${cardBg} rounded-md border ${border} flex items-center justify-center ${pageText} font-bold`}>in</a>
                    <a href="mailto:erionismajli50@gmail.com" className={`w-10 h-10 ${cardBg} rounded-md border ${border} flex items-center justify-center ${pageText} font-bold`}>@</a>
                  </div>

                  <a href="mailto:erionismajli50@gmail.com" className={`font-mono text-sm ${muted} underline`}>erionismajli50@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="container mx-auto px-6 py-12 max-w-4xl">
          <section id="home" className={`min-h-[60vh] flex flex-col justify-center mb-20 font-mono ${pageText}`}>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 mb-4 rounded-full overflow-hidden border border-black/30">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Erion"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-mono">.getAbout()</h2>

            <div className="space-y-2 text-center px-2 sm:px-6">
              <p className={`text-base sm:text-lg md:text-xl ${muted}`}>By day, I debug code.</p>
              <p className={`text-base sm:text-lg md:text-xl ${muted}`}>By night, I debug beats.</p>
              <p className={`text-base sm:text-lg md:text-xl ${muted}`}>Somewhere in between, I accidentally ship cool stuff.</p>
            </div>

            <p className={`mt-4 sm:mt-6 ${muted} text-center text-sm tracking-wide`}>
              // Full-stack developer × music producer
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="#contact"
                className={`px-5 py-3 ${cardBg} rounded-lg border ${border} flex items-center justify-center font-bold font-mono hover:opacity-90 transition`}
              >
                .contact()
              </a>
            </div>
          </section>

          <section id="skills" className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 font-mono ${pageText}`}>.skills()</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: ".NET", icon: "dotnet", label: "dotnet" },
                { name: "JavaScript", icon: "javascript", label: "javascript" },
                { name: "TypeScript", icon: "typescript", label: "typescript" },
                { name: "React", icon: "react", label: "react" },
                { name: "Next.js", icon: "nextdotjs", label: "nextjs" },
                { name: "Node.js", icon: "nodedotjs", label: "nodejs" },
                { name: "MSSQL", icon: "microsoftsqlserver", label: "mssql" },
                { name: "MongoDB", icon: "mongodb", label: "mongodb" },
                { name: "Tailwind CSS", icon: "tailwindcss", label: "tailwindcss" },
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center gap-2">
                  <img
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${skill.icon}.svg`}
                    alt={skill.name}
                    className={`w-20 h-20 ${iconFilter}`}
                  />
                  <span className={`font-mono text-sm ${pageText}`}>.{skill.label}()</span>
                </div>
              ))}
            </div>
          </section>

          <section id="xp" className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 font-mono ${pageText}`}>.xp()</h2>
            <div className="space-y-6">
              <div className={`border-l-2 ${border} pl-4 sm:pl-6`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                  <h3 className={`text-lg sm:text-xl font-bold ${pageText}`}>Software Developer, BPB Bank</h3>
                  <span className={`${muted} font-mono text-sm`}>Prishtina, Kosova</span>
                </div>
                <p className={`${muted} mb-3 font-mono text-sm`}>Feb 2023 - Present</p>
                <ul className={`space-y-1.5 ${pageText} leading-relaxed text-sm`}>
                  <li>• Designed and implemented RESTful APIs with Postman testing</li>
                  <li>• Full-stack development with ASP.NET Core 8 and Windows Services</li>
                  <li>• Built responsive UIs using React, JavaScript, Bootstrap, and jQuery</li>
                  <li>• Optimized SQL Server databases with procedures and triggers</li>
                  <li>• Managed CI/CD pipelines via Azure DevOps</li>
                  <li>• Collaborated with stakeholders for deployment and requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="projects" className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 font-mono ${pageText}`}>.projects()</h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              <a
                href="https://github.com/ArberZe/MealPath.OrderManagement"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block overflow-hidden rounded-xl border ${border} ${cardBg} backdrop-blur-sm transition-all hover:opacity-95`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src="https://arberdev.com/mealpath.png?height=250&width=350"
                    alt="MealPath.OrderManagement"
                    width={1200}
                    height={675}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-ti from-black/10 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className={`text-lg sm:text-2xl font-bold ${pageText}`}>MealPath.OrderManagement</h3>
                    <span className={`${muted} font-mono text-sm`}>→</span>
                  </div>
                  <p className={`${muted} mb-3 text-sm font-mono`}>github.com/ArberZe/MealPath.OrderManagement</p>
                  <p className={`${pageText} mb-4 leading-relaxed text-sm sm:text-base`}>
                    An order management system for Italian style pizza built with ASP.NET Core and React. Features user authentication with .NET Identity, role-based access (User, Admin, SuperAdmin), content management, and Stripe payment integration.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[".NET", "React", "TypeScript", "MongoDB", "SQL Server", "Stripe"].map((tech) => (
                      <span key={tech} className={`rounded-full ${cardBg} px-3 py-1 text-xs font-mono ${muted}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </section>

          <section id="timeline" className="mb-16">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-6 font-mono ${pageText}`}>.trainings()</h2>

            <div className="space-y-6">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>Sep 2024 - Dec 2024</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>BlockJump Kosovo — Blockchain training</p>
                  <p className={`${muted}`}>DLT, Blockchain programming, Solidity</p>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>Jun 2024 - Jul 2024</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>AUK — Python API & Django</p>
                  <p className={`${muted}`}>RESTful APIs, Django, MySQL</p>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>Nov 2023 - Jan 2024</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>Beetroot Academy Kosovo — Web App Dev</p>
                  <p className={`${muted}`}>React, Next.js, Express, Node, MongoDB, REST APIs</p>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>Oct 2022 - Feb 2023</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>Kosovo ICT — Java & Mobile</p>
                  <p className={`${muted}`}>Java, Android Studio, Firebase, SQLite</p>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>May 2018 - Aug 2018</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>DigitalStrom — Smart Home</p>
                  <p className={`${muted}`}>Smart Home certificate</p>
                </div>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <div className={`${muted} font-mono text-sm min-w-[100px]`}>Jan 2017 - Mar 2017</div>
                <div className="flex-1">
                  <p className={`${pageText} font-semibold mb-1`}>American Corner — STEM series</p>
                  <p className={`${muted}`}>Networking, Arduino, IoT, 3D printing</p>
                </div>
              </div>

              
            </div>
          </section>
        </main>

        <footer className={`relative z-10 py-12 border-t ${border}`}>
          <div className="mx-auto px-6 sm:px-8 md:px-8 max-w-4xl">
            <div className="text-center">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 font-mono ${pageText}`}>
                <span className={pageText}>contact(</span>
                <span className={muted}>)</span>
              </h2>

              <p className={`${muted} text-base sm:text-lg mb-6 font-mono leading-relaxed`}>
                Let's connect and build something awesome together.
              </p>

              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <a
                    href="https://github.com/erionismajli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${cardBg} rounded-lg border ${border} flex items-center justify-center ${pageText} hover:opacity-95 transition`}
                    title="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/erion-ismajli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${cardBg} rounded-lg border ${border} flex items-center justify-center ${pageText} font-bold font-mono hover:opacity-95 transition`}
                    title="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href="mailto:erionismajli50@gmail.com"
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${cardBg} rounded-lg border ${border} flex items-center justify-center ${pageText} font-bold font-mono hover:opacity-95 transition`}
                    title="Email"
                  >
                    @
                  </a>
                </div>
                <p className={`${muted} text-sm font-mono`}>
                  Or drop me an email at{" "}
                  <a href="mailto:erionismajli50@gmail.com" className={`${pageText} underline hover:opacity-90 transition-colors`}>
                    erionismajli50@gmail.com
                  </a>
                </p>
              </div>

              <div className="pt-6 border-t {border}">
                <p className={`${muted} text-sm font-mono`}>
                  <span className="text-black/40">// </span>
                  Built with Next.js, TypeScript & Tailwind CSS
                </p>
                <p className={`${muted} text-sm font-mono mt-2`}>
                  © {new Date().getFullYear()} Erion. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
