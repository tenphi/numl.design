import '../../numl/numl.dev';

let logoUrl = require('../images/logo.svg');

setTimeout(() => {
  Nude.getElementById('logo').setAttribute('src', logoUrl);

  const hueSlider = Nude.getElementById('hue-slider');
  const demoTheme = Nude.getElementById('demo-theme');
  const hueEl = Nude.getElementById('hue');

  hueSlider.addEventListener('input', (event) => {
    const hue = event.detail;

    demoTheme.setAttribute('hue', hue);
    hueEl.innerHTML = hue;
  });
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
