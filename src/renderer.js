const addressInput = document.getElementById('address');
const goBtn = document.getElementById('go');
const openGithubBtn = document.getElementById('open-github');
const installAppBtn = document.getElementById('install-app');
const webview = document.getElementById('webview');

function normalizeAddress(value) {
  if (!value) return '';
  // quick heuristic: if contains dot or starts with http, treat as URL
  if (/^https?:\/\//i.test(value)) return value;
  if (value.includes('.') || value.includes('localhost')) return 'https://' + value;
  // otherwise search via Google
  return 'https://www.google.com/search?q=' + encodeURIComponent(value);
}

goBtn.addEventListener('click', () => {
  const url = normalizeAddress(addressInput.value.trim());
  if (url) webview.src = url;
});

addressInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goBtn.click();
});

openGithubBtn.addEventListener('click', async () => {
  // Open GitHub in external browser (also loads into webview)
  const url = 'https://github.com';
  webview.src = url;
  if (window.lantern && window.lantern.openExternal) {
    await window.lantern.openExternal(url);
  }
});

installAppBtn.addEventListener('click', async () => {
  const manifest = {
    name: 'Example App',
    url: webview.src,
  };
  if (window.lantern && window.lantern.installApp) {
    const res = await window.lantern.installApp(manifest);
    alert('Install result: ' + JSON.stringify(res));
  } else {
    alert('Install API not available');
  }
});

// Quick keyboard shortcut: Ctrl/Cmd+K focuses address bar
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    addressInput.focus();
  }
});
