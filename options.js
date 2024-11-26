document.getElementById('save').addEventListener('click', () => {
    const tiltUrl = document.getElementById('tiltUrl').value;
    chrome.storage.sync.set({ tiltUrl }, () => {
      alert('URL de Tilt enregistrée.');
    });
  });
  
  // Charger l'URL actuelle au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('tiltUrl', (data) => {
      document.getElementById('tiltUrl').value = data.tiltUrl || '';
    });
  });