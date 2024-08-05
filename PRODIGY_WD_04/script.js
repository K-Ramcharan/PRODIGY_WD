document.addEventListener('DOMContentLoaded', () => {
    const texts = ["Student", "Intern", "Web Designer"];
    let index = 0;
    const element = document.getElementById('changing-text');

    function typeWriter(text, i, callback) {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            setTimeout(() => typeWriter(text, i + 1, callback), 100);
        } else if (typeof callback === 'function') {
            setTimeout(() => typeWriterBackwards(text, text.length - 1, callback), 2000);
        }
    }

    function typeWriterBackwards(text, i, callback) {
        if (i >= 0) {
            element.innerHTML = text.substring(0, i);
            setTimeout(() => typeWriterBackwards(text, i - 1, callback), 100);
        } else if (typeof callback === 'function') {
            callback();
        }
    }

    function startTextAnimation(i) {
        if (typeof texts[i] !== 'undefined') {
            typeWriter(texts[i], 0, () => {
                startTextAnimation((i + 1) % texts.length);
            });
        }
    }

    startTextAnimation(index);

    document.querySelectorAll('.navbar-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
