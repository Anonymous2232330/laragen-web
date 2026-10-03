window.HELP_IMPROVE_VIDEOJS = false;


// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// Music comparison table functionality
function setupMusicComparisonTable() {
    // User-selected samples; labels are the actual ANEW conditioning words.
    const musicData = [
        {"id": "test0351_seed204351", "candidate_id": "C04", "valence": 6.2, "arousal": 2.1, "emotion_label": "relaxed"},
        {"id": "test0367_seed204367", "candidate_id": "C06", "valence": 5.1, "arousal": 2.7, "emotion_label": "paper"},
        {"id": "test0049_seed204049", "candidate_id": "C07", "valence": 2.2, "arousal": 3.9, "emotion_label": "discomfort"},
        {"id": "test0405_seed204405", "candidate_id": "C08", "valence": 7.9, "arousal": 4.1, "emotion_label": "snuggle"},
        {"id": "test0181_seed204181", "candidate_id": "C09", "valence": 5.7, "arousal": 4.2, "emotion_label": "book"},
        {"id": "test0605_seed204605", "candidate_id": "C10", "valence": 3.8, "arousal": 4.3, "emotion_label": "detached"},
        {"id": "test0139_seed204139", "candidate_id": "C13", "valence": 5.9, "arousal": 6.1, "emotion_label": "curious"},
        {"id": "test0189_seed204189", "candidate_id": "C14", "valence": 8.1, "arousal": 6.2, "emotion_label": "terrific"},
        {"id": "test0095_seed204095", "candidate_id": "C16", "valence": 1.9, "arousal": 7.7, "emotion_label": "nightmare"},
        {"id": "test0419_seed204419", "candidate_id": "C20", "valence": 1.1, "arousal": 8.8, "emotion_label": "terrified"}
    ];

    const tableBody = document.getElementById('music-table-body');
    if (!tableBody) return;

    musicData.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.candidateId = item.candidate_id;

        // Prompt column
        const promptCell = document.createElement('td');
        promptCell.textContent = `(${item.valence.toFixed(1)}, ${item.arousal.toFixed(1)}) - ${item.emotion_label}`;
        promptCell.className = 'prompt-cell';
        row.appendChild(promptCell);

        // Audio player columns for each system
        const systems = ['gt', 'emotion_text_prompting', 'laragen'];
        systems.forEach(system => {
            const audioCell = document.createElement('td');

            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.preload = 'metadata';
            audioPlayer.style.width = '100%';
            audioPlayer.style.minWidth = '200px';
            audioPlayer.style.maxWidth = '250px';

            const source = document.createElement('source');
            source.src = `./static/mp3s/${system}/${item.id}.mp3`;
            source.type = 'audio/mpeg';

            audioPlayer.appendChild(source);
            audioCell.appendChild(audioPlayer);
            row.appendChild(audioCell);
        });

        tableBody.appendChild(row);
    });
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();

    // Setup music comparison table
    setupMusicComparisonTable();

})
