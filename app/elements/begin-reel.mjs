import styleText from "../browser/begin-reel.mjs";

export default function BeginReel({ html, state }) {
  const { attrs } = state
  let { itemwidth = 'auto', height = 'auto', space = 'var(--s0)', nobar = false } = attrs

  let id  = `Reel-${[itemwidth, height, space, nobar].join('')}`;

  return html`
  <style id="${id}">${styleText({ id, itemwidth, height, space, nobar })}</style>
  <script type="module">
import styleText from "/_public/pages/begin-reel.mjs"

class BeginReel extends HTMLElement {
  render() {
    console.log('render called')
    let { itemwidth, height, space, nobar } = this
    console.log(itemwidth, height, space, nobar)
    let id = \`Reel-\${[itemwidth, height, space, nobar].join('')}\`
    this.i = id
    this.querySelector('div').id = id
    if (!document.getElementById(this.id)) {
        let styleEl = document.createElement('style');
        let css = \`\${styleText({ id, itemwidth, height, space, nobar, tagName: \'begin-reel\' })}\`
        styleEl.appendChild(document.createTextNode(css))
        document.head.appendChild(styleEl);
    }
  }

  toggleOverflowClass(elem) {
    elem.classList.toggle('overflowing', this.scrollWidth > this.clientWidth);
  }

  get itemwidth() {
    return this.getAttribute('itemwidth') || 'auto';
  }

  set itemwidth(val) {
    return this.setAttribute('itemwidth', val);
  }

  get height() {
    return this.getAttribute('height') || 'auto';
  }

  set height(val) {
    return this.setAttribute('height', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s0)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  get nobar() {
    return this.hasAttribute('nobar');
  }

  set nobar(val) {
    if (val) {
      this.setAttribute('nobar', '');
    } else {
      this.removeAttribute('nobar');
    }
  }

  static get observedAttributes() {
    return ['itemwidth', 'height', 'space', 'nobar', 'my-space'];
  }

  connectedCallback() {
    if ('ResizeObserver' in window) {
      new ResizeObserver(entries => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this);
    }

    if ('MutationObserver' in window) {
      new MutationObserver(entries => {
        this.toggleOverflowClass(entries[0].target);
      }).observe(this, { childList: true });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue)
    this.render();
  }
}

customElements.define('begin-reel', BeginReel)
  </script>

  <div id="${id}" class="flex">
    <slot></slot>
  </div>
`
}
