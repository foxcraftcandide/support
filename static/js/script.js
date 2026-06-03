// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Pre-fill email with device/app info if available
(function() {
  const emailLink = document.getElementById('emailSupport');
  if (emailLink) {
    try {
      const agent = navigator.userAgent;
      const body = `\n\n---\nDevice: ${agent}\nApp: (enter app name & version)\n`; 
      const url = new URL(emailLink.href);
      const currentBody = url.searchParams.get('body') || '';
      url.searchParams.set('body', currentBody + encodeURIComponent(body));
      emailLink.href = url.toString();
    } catch (_) {}
  }

  // Privacy Policy Selector Logic
  const selector = document.getElementById('policySelector');
  const btn = document.getElementById('policyBtn');
  
  if (selector && btn) {
    function updatePolicy() {
      const url = selector.value;
      btn.href = url;
    }

    selector.addEventListener('change', updatePolicy);

    // Auto-select based on ?app= URL parameter
    try {
      const params = new URLSearchParams(window.location.search);
      const appParam = params.get('app');
      if (appParam) {
        // Find option with data-app matching the param
        const option = selector.querySelector(`option[data-app="${appParam.toLowerCase()}"]`);
        if (option) {
          option.selected = true;
          updatePolicy();
        }
      }
    } catch(_) {}
  }
})();
