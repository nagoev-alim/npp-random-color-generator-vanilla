// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { uid } from './modules/uid.js';
import { showNotification } from './modules/showNotification.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='color-generator'>
    <h2 class='color-generator__title'>Color Generator</h2>
      <div class='color-generator__card'>
        <div class='color-generator__card-area' data-area></div>
        <p class='color-generator__card-name' data-current>#A1B5C1</p>
      </div>
      <div class='color-generator__btns'>
        <button class='color-generator__btn' data-pick>Generate color</button>
        <button class='color-generator__btn' data-copy>Click to copy</button>
      </div>
      <p>Or just press the "Spacebar" to generate new palettes.</p>
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    this.parent = document.querySelector('.color-generator');
    this.current = document.querySelector('[data-current]');
    this.area = document.querySelector('[data-area]');
    this.btnGenerate = document.querySelector('[data-pick]');
    this.btnCopy = document.querySelector('[data-copy]');

    this.btnGenerate.addEventListener('click', this.setColor);
    this.btnCopy.addEventListener('click', this.copyColor);
    document.addEventListener('keydown', ({ code }) => code === 'Space' ? this.copyColor() : false);
  }

  /**
   * Generate color
   * @returns {string}
   */
  generate = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) color += this.options[Math.floor(Math.random() * this.options.length)];
    return color;
  };

  /**
   * Set color
   * @returns {string}
   */
  setColor = () => this.current.textContent = this.area.style.backgroundColor = this.generate();

  /**
   * Copy color to clipboard
   */
  copyColor = () => {
    const color = this.current.innerText;
    const textArea = document.createElement('textarea');
    const alert = document.createElement('div');

    textArea.value = color;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    alert.classList.add('color-generator__alert');
    alert.innerHTML = `Color <span>${color}</span> copied to your clipboard`;
    this.parent.insertAdjacentElement('afterbegin', alert);

    setTimeout(() => {
      alert.style.animation = 'hideAlert 200ms forwards';
      setTimeout(() => alert.remove(), 1000);
    }, 2000);
  };
}

// ⚡️Class instance
new App();
