const DEFAULT_URL = 'http://localhost:10350';

function setIcon(status) {
    const iconPath = {
      "16": `icon-${status}-16.png`,
      "32": `icon-${status}-32.png`,
      "48": `icon-${status}-48.png`,
      "128": `icon-${status}-128.png`
    };
    chrome.action.setIcon({ path: iconPath });
  }
  

  function checkTiltStatus() {
    chrome.storage.sync.get('tiltUrl', (data) => {
      const tiltUrl = data.tiltUrl || DEFAULT_URL;
      fetch(tiltUrl)
        .then(response => {
          if (response.ok) {
            // Tilt est actif
            setIcon('active');
          } else {
            // Tilt est inactif
            setIcon('inactive');
          }
        })
        .catch(error => {
          // Impossible de joindre Tilt
          setIcon('error');
        });
    });
  }

// Vérifier l'état de Tilt au démarrage
checkTiltStatus();

// Planifier la vérification toutes les minutes
chrome.alarms.create('checkTiltStatus', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkTiltStatus') {
    checkTiltStatus();
  }
});

// Ouvrir la page Tilt lorsque l'icône est cliquée
chrome.action.onClicked.addListener(() => {
  chrome.storage.sync.get('tiltUrl', (data) => {
    const tiltUrl = data.tiltUrl || DEFAULT_URL;
    chrome.tabs.create({ url: tiltUrl });
  });
});