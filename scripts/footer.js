fetch('../pages/social-media.html').then(response => response.text()).then(footer => document.getElementById('socialMedia').innerHTML = footer);
fetch('../pages/footer.html').then(response => response.text()).then(footer => document.getElementById('footer').innerHTML = footer);
