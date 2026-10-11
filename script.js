const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
const copyButton = document.querySelector('#copy-zelle');
if (copyButton) {
copyButton.setAttribute('aria-live', 'polite');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('+12135009676');
    copyButton.textContent = 'Copied!';
  } catch {
    copyButton.textContent = 'Select the number above to copy';
  }
});

}
