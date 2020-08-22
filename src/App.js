import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './switch.css';
// import './assets/css/utilities.css'
// import './assets/css/custom.css'
// import './assets/css/slick.min.css'
// // import './assets/css/vegas.min.css'
// import './assets/css/featherlight.min.css'
// import './assets/css/featherlight.gallery.min.css'
// import './assets/css/fontawesome/all.min.css'
// import './assets/css/themify-icons.css'

import Gol from './gol/gol'

function App() {
  return (
    <>
      <div>
        <title>Game of Life</title>


        <div className="site-container">
          <div id="top" />
          {/* Mobile logo */}
          <a href="#" className="mobile-logo mobile-logo-light bg-primary">
            <span>Game of Life</span>
          </a>
          {/* Navigation toggle */}
          <button type="button" id="navigation-toggle" className="nav-toggle nav-toggle-light bg-primary">
            <span />
          </button>
          {/* Site header */}
          <header className="site-header bg-primary">
            <div className="header-inner">
              <div className="header-brand">
                {/* Logo */}
                <a href="#" className="logo">
                  <span>Game of Life</span>
                  <span className="title-letter">G</span>
                </a>
              </div>
              <div className="nav-divider mb-5" />

              <nav className="site-nav">
                <ul id="navigation">
                  {/* <button type="" */}

                  <div>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600">
                      <defs>
                        <filter id="goo" colorInterpolationFilters="sRGB">
                          <feGaussianBlur in="SourceGraphic" stdDeviation={8} result="blur" />
                          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="cm" />
                        </filter>
                      </defs>
                      <g id="dragGroup">
                        <path id="dragBar" fill="#FFFFFF" d="M447,299.5c0,1.4-1.1,2.5-2.5,2.5h-296c-1.4,0-2.5-1.1-2.5-2.5l0,0c0-1.4,1.1-2.5,2.5-2.5
		h296C445.9,297,447,298.1,447,299.5L447,299.5z" />
                        <g id="displayGroup">
                          <g id="gooGroup" filter="url(#goo)">
                            <circle id="display" fill="#FFFFFF" cx={146} cy="299.5" r={16} />
                            <circle id="dragger" fill="#FFFFFF" stroke="#03A9F4" strokeWidth={0} cx={146} cy="299.5" r={15} />
                          </g>
                          <text className="downText" x={146} y={304}>0</text>
                          <text className="upText" x={145} y={266}>0</text>
                        </g>
                      </g>
                    </svg>
                  </div>

                </ul>
              </nav>
              <div className="nav-divider my-5" />
              <nav>
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a className="btn btn-sm btn-icon btn-outline-white btn-transparent rounded-circle" href="#">
                      <span className="btn-icon-inner fab fa-facebook-f" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          {/* Header overlay */}
          <div className="header-overlay">
            <div className="overlay-inner bg-dark opacity-80" />
          </div>
          {/* Back to top button */}
          <button type="button" id="backtotop" className="btn btn-primary btn-icon">
            <span className="btn-icon-inner fas fa-angle-up" />
          </button>
          {/* Page wrapper */}
          <div className="page-wrapper App">
            <Gol></Gol>
          </div>{/* end .page-wrapper */}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content />
        <meta name="keywords" content />
        <meta name="author" content="Erilisdesign.com" />
        <script type="text/javascript" src="./aswitch.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/Draggable.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/gsap.min.js"></script>
      </Helmet>
    </>
  );
}

export default App;
