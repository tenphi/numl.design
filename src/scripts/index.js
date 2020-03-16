import '../../numl/numl.dev';

let logoUrl = require('../images/logo.svg');

setTimeout(() => {
  const html = document.querySelector('html');

  Nude.getElementById('logo').setAttribute('src', logoUrl);

  const hueSlider = Nude.getElementById('hue-slider');
  const demoTheme = Nude.getElementById('demo-theme');
  const hueEl = Nude.getElementById('hue');

  hueSlider.addEventListener('input', (event) => {
    const hue = event.detail;

    demoTheme.setAttribute('hue', hue);
    hueEl.innerHTML = hue;
  });

  // TOGGLE SCHEME
  const toggle = Nude.getElementById('scheme-switch');

  function toggleScheme() {
    let scheme;

    if (html.classList.contains('nu-scheme-dark')) {
      scheme = 'light';
    } else if (html.classList.contains('nu-scheme-light')) {
      scheme = 'dark';
    } else {
      scheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }

    if (scheme === 'light') {
      html.classList.remove('nu-scheme-dark');
      html.classList.add('nu-scheme-light');
    } else {
      html.classList.remove('nu-scheme-light');
      html.classList.add('nu-scheme-dark');
    }

    setToggleStyle(scheme);
  }

  function setToggleStyle(scheme) {
    if (scheme === 'dark') {
      toggle.setAttribute('checked', '');
    } else {
      toggle.removeAttribute('checked');
    }
  }

  setToggleStyle(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  toggle.addEventListener('tap', toggleScheme);

  // TOGGLE CONTRAST
  const toggleContrastEl = Nude.getElementById('contrast-switch');

  function toggleContrast() {
    let contrast;

    if (html.classList.contains('nu-contrast-high')) {
      contrast = 'low';
    } else if (html.classList.contains('nu-contrast-low')) {
      contrast = 'high';
    } else {
      contrast = matchMedia('(prefers-contrast: high)').matches ? 'low' : 'high';
    }

    if (contrast === 'low') {
      html.classList.remove('nu-contrast-high');
      html.classList.add('nu-contrast-low');
    } else {
      html.classList.remove('nu-contrast-low');
      html.classList.add('nu-contrast-high');
    }

    setToggleContrastStyle(contrast);
  }

  function setToggleContrastStyle(contrast) {
    if (contrast === 'high') {
      toggleContrastEl.setAttribute('checked', '');
    } else {
      toggleContrastEl.removeAttribute('checked');
    }
  }

  setToggleContrastStyle(matchMedia('(prefers-contrast: high)').matches ? 'high' : 'low');

  toggleContrastEl.addEventListener('tap', toggleContrast);
});

// FIX FAVICON

const link = document.createElement('link');

link.setAttribute('rel', 'favicon icon');

// Listen media change
const match = window.matchMedia('(prefers-color-scheme:light)');

function iconChangeHandler(e) {
  const source = document.querySelector(`link[rel*="icon"][media="(prefers-color-scheme:${e.matches ? 'light' : 'dark'})"]`);

  if (!source) return;

  if (!link.parentNode) {
    document.head.appendChild(link);
  }

  link.setAttribute('type', source.type);
  link.setAttribute('href', source.href);
}

match.addListener(iconChangeHandler);

iconChangeHandler(match);
