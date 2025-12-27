document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // --- 1. DYNAMIC COUNTERS ---
    const counters = document.querySelectorAll(".count");
    const startCounter = (el) => {
        if (el.classList.contains('active')) return;
        el.classList.add('active');
        const target = parseInt(el.getAttribute("data-target"));
        let count = 0;
        const step = target / 50; 
        const update = () => {
            if (count < target) {
                count += step;
                el.innerText = Math.ceil(count);
                setTimeout(update, 30);
            } else { el.innerText = target; }
        };
        update();
    };

    // --- 2. IMAGE LOADING (Lazy Loading Bonus Feature) ---
    const images = document.querySelectorAll(".lazy-img");
    const showImage = (img) => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.style.opacity = "1";
            img.style.transform = "translateY(0)";
        }
    };

    // --- 3. TIMELINE ANIMATION (The missing piece) ---
    const timelineItems = document.querySelectorAll(".timeline-item");
    const showTimelineItem = (item) => {
        item.classList.add('active');
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
    };

    // --- 4. THE TRIGGER (INTERSECTION OBSERVER) ---
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('count')) {
                    startCounter(entry.target);
                } else if (entry.target.classList.contains('lazy-img')) {
                    showImage(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    showTimelineItem(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Watch all mandatory sections
    counters.forEach(c => observer.observe(c));
    images.forEach(i => observer.observe(i));
    timelineItems.forEach(t => observer.observe(t)); // Fixed: Now watching timeline

    // --- 5. FAN FORM LOGIC ---
    const fanForm = document.getElementById('fanForm');
    if(fanForm) {
        fanForm.addEventListener('submit', (e) => {
            e.preventDefault();
            fanForm.classList.add('hidden');
            document.getElementById('formFeedback').classList.remove('hidden');
        });
    }
});