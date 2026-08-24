const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.navlinks');

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById('consultation-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const area = String(data.get('area') || '').trim();
    const service = String(data.get('service') || '').trim();
    const times = String(data.get('times') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Free consultation request — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Service area: ${area}`,
      `Type of support: ${service}`,
      `Preferred days / times: ${times || 'Flexible / not specified'}`,
      '',
      'Care needs:',
      message
    ].join('\n');

    const mailto = `mailto:kaysmountaintop@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    if (status) {
      status.textContent = 'Your email app should open with the consultation details filled in. Review the message, then send it when ready.';
    }
  });
}
