class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const p = document.createElement('p');
    p.textContent = 'Hello World';
    shadow.appendChild(p);
  }
}

// POSSIBILITY 2: Use a style tag per component
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(`
//   /* Shared styles */
//   .shared-switch-style {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

//   .shared-switch-style input[type="checkbox"] {
//     transform: scale(1.5);
//   }
// `);

class SwitchInput extends HTMLElement {
  private isOn: boolean;

  constructor() {
    super();
    this.isOn = false;

    // POSSIBILITY 1: Use a style tag per component
    const style = document.createElement('style');
    style.textContent = `
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
    font-family: Arial, sans-serif;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background-color: #4CAF50;
  }
`;

    const shadow = this.attachShadow({ mode: 'open' });

    // POSSIBILITY 2: Use a shared stylesheet
    // shadow.adoptedStyleSheets = [sheet]; // Shared stylesheet

    const label = document.createElement('label');
    label.classList.add('shared-switch-style');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = this.getAttribute('id') || '';
    label.textContent = this.getAttribute('name') || '';
    label.appendChild(input);

    // POSSIBILITY 1: Use a style tag per component
    shadow.appendChild(style);

    shadow.appendChild(label);

    input.addEventListener('change', this.toggle.bind(this));
  }

  toggle(event: Event) {
    const input = event.target as HTMLInputElement;
    const eventOn = this.getAttribute('eventOn') || 'onSwitchOn';
    const eventOff = this.getAttribute('eventOff') || 'onSwitchOff';

    if (input.checked) {
      this.isOn = true;
      this.dispatchEvent(
        new CustomEvent(eventOn, { bubbles: true, composed: true }),
      );
    } else {
      this.isOn = false;
      this.dispatchEvent(
        new CustomEvent(eventOff, { bubbles: true, composed: true }),
      );
    }
  }
}

import { wcagCriteria } from './wcagData.js';

console.log(wcagCriteria);

const sheetCards = new CSSStyleSheet();
sheetCards.replaceSync(`
  .wcag-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
    color: #fff;
    padding: 16px;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    min-height: 400px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .principle {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .principle .icon {
    font-size: 1.2rem;
  }

  .principle-text {
    font-size: 1rem;
    font-weight: bold;
  }

  .level {
    background-color: white;
    color: black;
    border-radius: 10%;
    padding: 4px 8px;
    font-weight: bold;
    font-size: 1rem;
  }

  .content {
    margin-top: 1.5rem;
    margin-bottom: auto;
  }

  .content h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
  }

  .content h3 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .content p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }

  .criteria-link {
    font-size: 0.875rem;
  }

  .criteria-link a {
    color: #fff;
    text-decoration: underline;
  }

  .criteria-link a:hover {
    color: #ccc;
  }

`);

class WcagCard extends HTMLElement {
  private criterion: string;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.criterion = this.getAttribute('criterion') || '';

    const data = wcagCriteria[this.criterion];
    if (!data) {
      shadow.innerHTML = `<p>Criterion not found.</p>`;
      return;
    }

    shadow.adoptedStyleSheets = [sheetCards];

    const container = document.createElement('article');
    container.classList.add('wcag-card');
    container.style.backgroundColor = data.background;

    container.innerHTML = `
      <header>
        <div class="principle">
          <span class="principle-text">${data.principle}</span>
        </div>
        <span class="level">${data.level}</span>
      </header>
      <div class="content">
        <h2>${this.criterion}</h2>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
      </div>
      <footer>
        <div class="criteria-link">
          <strong>Success Criterion:</strong>
          <a style="text-wrap: wrap; hyphens: auto; word-break: break-word;" href="${data.link}" rel="nofollow noopener" target="_blank">${data.link}</a>
        </div>
      </footer>
    `;

    shadow.appendChild(container);
  }

  // Optional: Allow dynamic updates
  static get observedAttributes() {
    return ['criterion'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'criterion' && oldValue !== newValue) {
      this.criterion = newValue;
      this.render();
    }
  }

  render() {
    const data = wcagCriteria[this.criterion];
    if (!data) {
      this.shadowRoot!.innerHTML = `<p>Criterion not found.</p>`;
      return;
    }

    const container = this.shadowRoot!.querySelector('article')!;
    container.style.backgroundColor = data.background;
    container.querySelector('h2')!.textContent = this.criterion;
    container.querySelector('h3')!.textContent = data.title;
    container.querySelector('p')!.textContent = data.description;
    container.querySelector('.principle-text')!.textContent = data.principle;
    container.querySelector('.level')!.textContent = data.level;
    container.querySelector('a')!.textContent = data.link;
    container.querySelector('a')!.href = data.link;
    container.querySelector('button')!.textContent = data.title;
  }
}

customElements.define('hello-world', HelloWorld);
customElements.define('switch-input', SwitchInput);
customElements.define('wcag-card', WcagCard);

export { HelloWorld, SwitchInput, WcagCard };
