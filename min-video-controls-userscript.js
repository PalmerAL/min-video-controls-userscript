// ==UserScript==
// @name Min Native Video Controls
// @match https://www.instagram.com
// @match https://www.youtube.com
// @run-at document-start
// ==/UserScript==

function inject() {
    if (window.location.toString().includes('/reel')) {
      Array.from(document.querySelectorAll('video')).forEach(v => {
        v.controls = true;
        v.nextSibling.childNodes[0].style['pointer-events'] = 'none'
        v.nextSibling.childNodes[0].childNodes[1].style['pointer-events'] = 'auto'
      })
    }
  
    if (window.location.toString().includes('/shorts')) {
      if (!document.getElementById('video-controls-userscript-style')) {
        const style = `
          reel-player-header-renderer * {
          pointer-events: none !important;
          }
          reel-player-header-renderer {
          transition: 0.2s opacity !important;
          }
          ytd-reel-video-renderer:hover reel-player-header-renderer {
          opacity: 0 !important;
          }
      `
  
        const styleEl = document.createElement('style')
        styleEl.innerHTML = style;
        styleEl.id = 'video-controls-userscript-style'
        document.head.appendChild(styleEl)
      }
  
      Array.from(document.querySelectorAll('video')).forEach(v => {
        v.controls = true;
  
        const observer = new MutationObserver((list, observer) => {
          for (const mutation of list) {
            if (mutation.attributeName === 'controls' && v.controls === false) {
              v.controls = true
            }
          }
        })
  
        observer.observe(v, { attributes: true })
      })
    }
  }
  
  document.body.addEventListener('click', (e) => {
    inject()
  })
  
  setTimeout(inject, 2000)
  setTimeout(inject, 4000)
  setTimeout(inject, 6000)