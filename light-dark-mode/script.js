const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const textBox = document.getElementById('text-box')

function toggleTheme(isLight) {
  nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  textBox.style.backgroundColor = isLight ?  'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
  toggleIcon.children[0].textContent = isLight ? 'Light Mode' : 'Dark Mode';
  isLight ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : 
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
  isLight ? imageMode('light') : imageMode("dark");
  

}
// toggle image colors
function imageMode(color) {
  image1.src = `images/undraw_web_developer_re_h7ie_${color}.svg`;
  image2.src = `images/undraw_conceptual_idea_${color}.svg`;
  image3.src = `images/undraw_feeling_proud_${color}.svg`;
}

// function darkMode() {
//   nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
//   toggleIcon.children[0].textContent = 'Dark Mode';
//   toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//   imageMode("dark");
// }
// function lightMode() {
//   nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//   textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   toggleIcon.children[0].textContent = 'Light Mode';
//   toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//   imageMode('light')
// }


// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleTheme(false);
} else {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'dark');
  toggleTheme(true);
}
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);

// check Local Storage for theme
const currentTheme = localStorage.getItem('theme')
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme)
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleTheme(true);
  }
}
