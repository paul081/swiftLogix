// Simple interaction for the replica
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  
  // Scroll threshold for navbar background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.8)';
      nav.style.boxShadow = 'none';
    }
  });

  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .safety-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
  });

  // Tracking Form Logic
  const trackingForm = document.getElementById('trackingForm');
  const trackingResult = document.getElementById('trackingResult');
  const trackingInput = document.getElementById('trackingInput');
  const trackingID = document.getElementById('trackingID');

  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = trackingInput.value;
      
      // Simulate loading
      const btn = trackingForm.querySelector('button');
      const originalText = btn.innerText;
      btn.innerText = 'Searching...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        
        // Show result
        trackingID.innerText = `#${val || 'SLX12345678'}`;
        trackingResult.classList.remove('hidden');
        
        // Scroll to result
        trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1200);
    });
  }
});
