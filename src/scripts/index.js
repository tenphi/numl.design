import '../../numl/index';

const icons = require('../images/*.svg');

window.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('nu-svg')].forEach(svgEl => {
    const name = svgEl.getAttribute('name');

    if (!name || !icons[name]) return;

    svgEl.setAttribute('src', icons[name]);
  });

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

  function setToggleStyle(scheme) {
    if (scheme === 'dark') {
      toggle.setAttribute('checked', '');
    } else {
      toggle.removeAttribute('checked');
    }
  }

  setToggleStyle(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // TOGGLE CONTRAST
  const toggleContrastEl = Nude.getElementById('contrast-switch');

  function setToggleContrastStyle(contrast) {
    if (contrast === 'high') {
      toggleContrastEl.setAttribute('checked', '');
    } else {
      toggleContrastEl.removeAttribute('checked');
    }
  }

  setToggleContrastStyle(matchMedia('(prefers-contrast: high)').matches ? 'high' : 'low');

  // SNIPPET SELECTOR

  const selectorEl = Nude.getElementById('snippet-selector');
  const iframe = document.querySelector('iframe');

  const snippets = {
    card: `https://numl.design/repl#%7B%22scale%22%3A1%2C%22markup%22%3A%22%3Cnu-card%5Cn%20%20%20%20%20%20%20%20%20responsive%3D%5C%22420px%5C%22%3E%5Cn%20%20%3Cnu-flex%20gap%3D%5C%222x%5C%22%20flow%3D%5C%22row%7Ccolumn%5C%22%3E%5Cn%20%20%20%20%3Cnu-svg%5Cn%20%20%20%20%20%20%20%20%20%20%20%20src%3D%5C%22%2Fimg%2Ficon.svg%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20color%3D%5C%22special-bg%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20width%3D%5C%22min(4)%5C%22%20height%3D%5C%224%5C%22%3E%3C%2Fnu-svg%3E%5Cn%20%20%20%20%3Cnu-flex%20gap%3D%5C%222x%7C1x%5C%22%20grow%3D%5C%221%5C%22%20flow%3D%5C%22column%5C%22%20text%3D%5C%22left%7Ccenter%5C%22%3E%5Cn%20%20%20%20%20%20%3Cnu-heading%20grow%3D%5C%221%5C%22%20size%3D%5C%22h3%7Ch4%5C%22%3E%5Cn%20%20%20%20%20%20%20%20NuML%20Design%20System%5Cn%20%20%20%20%20%20%3C%2Fnu-heading%3E%5Cn%20%20%20%20%20%20%3Cnu-line%3E%3C%2Fnu-line%3E%5Cn%20%20%20%20%20%20%3Cnu-block%20size%3D%5C%22lg%7Cmd%5C%22%3E%5Cn%20%20%20%20%20%20%20%20Markup%20tool%20that%20reinvents%20the%20way%20Web%20Apps%20are%20built...%5Cn%20%20%20%20%20%20%3C%2Fnu-block%3E%5Cn%20%20%20%20%20%20%3Cnu-btn%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20place%3D%5C%22start%7Cstretch%5C%22%20size%3D%5C%22lg%7Cmd%5C%22%20%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20special%20to%3D%5C%22!https%2F%2Fnuml.design%2F%5C%22%3E%5Cn%20%20%20%20%20%20%20%20Learn%20more%5Cn%20%20%20%20%20%20%3C%2Fnu-btn%3E%5Cn%20%20%20%20%3C%2Fnu-flow%3E%5Cn%20%20%3C%2Fnu-flex%3E%5Cn%3C%2Fnu-card%3E%5Cn%22%2C%22options%22%3A%7B%22themeType%22%3A%22main%22%2C%22hue%22%3A272%2C%22pastel%22%3Afalse%2C%22saturation%22%3A80%2C%22saturationType%22%3A%22auto%22%2C%22gap%22%3A0.5%2C%22borderWidth%22%3A1%2C%22radius%22%3A0.5%2C%22transitionTime%22%3A80%2C%22scheme%22%3A%22auto%22%2C%22contrast%22%3A%22auto%22%2C%22reducedMotion%22%3A%22auto%22%7D%2C%22embed%22%3Atrue%7D`,
    tabs: `https://numl.design/repl#%7B%22scale%22%3A1%2C%22markup%22%3A%22%3Cnu-card%5Cn%20%20%20%20%20%20%20%20%20responsive%3D%5C%22420px%5C%22%20gap%3D%5C%221x%5C%22%3E%5Cn%20%20%3Cnu-heading%20size%3D%5C%22h3%7Ch4%5C%22%3ENuML%20Design%20System%3C%2Fnu-heading%3E%5Cn%20%20%3Cnu-line%20show%3D%5C%22y%7Cn%5C%22%3E%3C%2Fnu-line%3E%5Cn%20%20%3Cnu-flex%20flow%3D%5C%22row%7Ccolumn%5C%22%20gap%3D%5C%222x%5C%22%3E%5Cn%20%20%20%20%3Cnu-attrs%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%3D%5C%22nu-tab%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20opacity%3D%5C%22.75%20%3Apressed%5B1%5D%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20transition%3D%5C%22opacity%5C%22%3E%3C%2Fnu-attrs%3E%5Cn%20%20%20%20%3Cnu-tablist%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20direction%3D%5C%22right%7Cbottom%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20value%3D%5C%22flexibility%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20border%3D%5C%22right%20inside%7Cbottom%20inside%5C%22%3E%5Cn%20%20%20%20%20%20%3Cnu-tab%20controls%3D%5C%22flexibility%5C%22%3E%5Cn%20%20%20%20%20%20%20%20Flexibility%5Cn%20%20%20%20%20%20%3C%2Fnu-tab%3E%5Cn%20%20%20%20%20%20%3Cnu-tab%20controls%3D%5C%22speed%5C%22%3E%5Cn%20%20%20%20%20%20%20%20Speed%5Cn%20%20%20%20%20%20%3C%2Fnu-tab%3E%5Cn%20%20%20%20%20%20%3Cnu-tab%20controls%3D%5C%22compatibility%5C%22%3E%5Cn%20%20%20%20%20%20%20%20Compatibility%5Cn%20%20%20%20%20%20%3C%2Fnu-tab%3E%5Cn%20%20%20%20%3C%2Fnu-tablist%3E%5Cn%20%20%20%20%3Cnu-block%20id%3D%5C%22flexibility%5C%22%3E%5Cn%20%20%20%20%20%20Create%20virtually%20any%20interface%20you%20want%20without%20writing%20tricky%20CSS%20selectors%20and%20low-level%20styles.%5Cn%20%20%20%20%3C%2Fnu-block%3E%5Cn%20%20%20%20%3Cnu-block%20id%3D%5C%22speed%5C%22%3E%5Cn%20%20%20%20%20%20Get%20production-ready%20high-quality%20markup%20with%20speed%20faster%20than%20prototyping%20tools.%5Cn%20%20%20%20%3C%2Fnu-block%3E%5Cn%20%20%20%20%3Cnu-block%20id%3D%5C%22compatibility%5C%22%3E%5Cn%20%20%20%20%20%20Highly%20compatible%20with%20modern%20JS%20frameworks.%20Doesn't%20use%20%5Bclass%5D%20or%20%5Bdata-*%5D%20attributes.%5Cn%20%20%20%20%3C%2Fnu-block%3E%5Cn%20%20%3C%2Fnu-flex%3E%5Cn%3C%2Fnu-card%3E%5Cn%22%2C%22options%22%3A%7B%22themeType%22%3A%22main%22%2C%22hue%22%3A272%2C%22pastel%22%3Afalse%2C%22saturation%22%3A50%2C%22saturationType%22%3A%22custom%22%2C%22gap%22%3A0.5%2C%22borderWidth%22%3A1%2C%22radius%22%3A0.5%2C%22transitionTime%22%3A80%2C%22scheme%22%3A%22auto%22%2C%22contrast%22%3A%22auto%22%2C%22reducedMotion%22%3A%22auto%22%7D%2C%22embed%22%3Atrue%7D`,
    dropdown: 'https://numl.design/repl#%7B%22scale%22%3A1%2C%22markup%22%3A%22%3Cnu-attrs%5Cn%20%20%20%20%20%20%20%20%20%20for%3D%5C%22dropdown-icon%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20name%3D%5C%22chevron-down%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20scale%3D%5C%22%5E%3Apressed%5Bflip-y%5D%5C%22%5Cn%20%20%20%20%20%20%20%20%20%20size%3D%5C%222.5x%5C%22%3E%3C%2Fnu-attrs%3E%5Cn%5Cn%3Cnu-btn%20role%3D%5C%22checkbox%5C%22%3E%5Cn%20%20Dropdown%5Cn%20%20%3Cnu-icon%20as%3D%5C%22dropdown-icon%5C%22%3E%3C%2Fnu-icon%3E%5Cn%20%20%3Cnu-popup%3E%5Cn%5Ct%5Ct~~Content~~%5Cn%20%20%3C%2Fnu-popup%3E%5Cn%3C%2Fnu-btn%3E%22%2C%22options%22%3A%7B%22themeType%22%3A%22main%22%2C%22hue%22%3A272%2C%22pastel%22%3Afalse%2C%22saturation%22%3A50%2C%22saturationType%22%3A%22custom%22%2C%22gap%22%3A0.5%2C%22borderWidth%22%3A1%2C%22radius%22%3A0.5%2C%22transitionTime%22%3A80%2C%22scheme%22%3A%22auto%22%2C%22contrast%22%3A%22auto%22%2C%22reducedMotion%22%3A%22auto%22%7D%2C%22embed%22%3Atrue%7D',
  };

  selectorEl.addEventListener('input', (id) => {
    setSnippet(id.detail);
  });

  function setSnippet(id) {
    const doReload = iframe.hasAttribute('src');

    iframe.src = snippets[id];

    if (doReload) {
      try {
        iframe.contentWindow.location.reload();
      } catch(e) {} // throws error in local ENV
    }
  }

  setSnippet('card');
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
