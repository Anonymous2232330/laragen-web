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

// Emotion terms mapping
const emotionTerms = {
  "arousal_1_valence_1": "dreary",
  "arousal_1_valence_2": "gloom",
  "arousal_1_valence_3": "bored",
  "arousal_1_valence_4": "fatigued",
  "arousal_1_valence_5": "sleepy",
  "arousal_1_valence_6": "calm",
  "arousal_1_valence_7": "relaxed",
  "arousal_1_valence_8": "peaceful",
  "arousal_1_valence_9": "serene",
  "arousal_2_valence_1": "miserable",
  "arousal_2_valence_2": "sad",
  "arousal_2_valence_3": "depressed",
  "arousal_2_valence_4": "lonely",
  "arousal_2_valence_5": "pensive",
  "arousal_2_valence_6": "quiet",
  "arousal_2_valence_7": "content",
  "arousal_2_valence_8": "tranquil",
  "arousal_2_valence_9": "at_ease",
  "arousal_3_valence_1": "dejected",
  "arousal_3_valence_2": "unhappy",
  "arousal_3_valence_3": "sorrowful",
  "arousal_3_valence_4": "melancholy",
  "arousal_3_valence_5": "thoughtful",
  "arousal_3_valence_6": "soothed",
  "arousal_3_valence_7": "satisfied",
  "arousal_3_valence_8": "gentle",
  "arousal_3_valence_9": "loving",
  "arousal_4_valence_1": "troubled",
  "arousal_4_valence_2": "displeased",
  "arousal_4_valence_3": "disappointed",
  "arousal_4_valence_4": "yearning",
  "arousal_4_valence_5": "neutral",
  "arousal_4_valence_6": "pleasant",
  "arousal_4_valence_7": "pleased",
  "arousal_4_valence_8": "hopeful",
  "arousal_4_valence_9": "affectionate",
  "arousal_5_valence_1": "distressed",
  "arousal_5_valence_2": "agitated",
  "arousal_5_valence_3": "frustrated",
  "arousal_5_valence_4": "tense",
  "arousal_5_valence_5": "stirred",
  "arousal_5_valence_6": "moved",
  "arousal_5_valence_7": "touched",
  "arousal_5_valence_8": "inspired",
  "arousal_5_valence_9": "passionate",
  "arousal_6_valence_1": "annoyed",
  "arousal_6_valence_2": "irritated",
  "arousal_6_valence_3": "anxious",
  "arousal_6_valence_4": "nervous",
  "arousal_6_valence_5": "surprised",
  "arousal_6_valence_6": "impressed",
  "arousal_6_valence_7": "elated",
  "arousal_6_valence_8": "joyful",
  "arousal_6_valence_9": "romantic",
  "arousal_7_valence_1": "afraid",
  "arousal_7_valence_2": "fearful",
  "arousal_7_valence_3": "angry",
  "arousal_7_valence_4": "aroused",
  "arousal_7_valence_5": "astonished",
  "arousal_7_valence_6": "energetic",
  "arousal_7_valence_7": "happy",
  "arousal_7_valence_8": "delighted",
  "arousal_7_valence_9": "excited",
  "arousal_8_valence_1": "scared",
  "arousal_8_valence_2": "hostile",
  "arousal_8_valence_3": "enraged",
  "arousal_8_valence_4": "shocked",
  "arousal_8_valence_5": "adventurous",
  "arousal_8_valence_6": "lively",
  "arousal_8_valence_7": "playful",
  "arousal_8_valence_8": "triumphant",
  "arousal_8_valence_9": "ecstatic",
  "arousal_9_valence_1": "terrified",
  "arousal_9_valence_2": "panicked",
  "arousal_9_valence_3": "furious",
  "arousal_9_valence_4": "rage",
  "arousal_9_valence_5": "wild",
  "arousal_9_valence_6": "active",
  "arousal_9_valence_7": "exuberant",
  "arousal_9_valence_8": "euphoric",
  "arousal_9_valence_9": "thrilled"
};

// Function to find closest emotion term based on VA values
function findClosestEmotionTerm(valence, arousal) {
  // Convert VA values to grid indices (1-9 scale)
  // Assuming VA values range from 1-9, but our data might have different ranges
  // Let's assume our VA values are on a 1-9 scale
  const v = Math.round(valence);
  const a = Math.round(arousal);

  // Clamp to valid range
  const clampedV = Math.max(1, Math.min(9, v));
  const clampedA = Math.max(1, Math.min(9, a));

  const key = `arousal_${clampedA}_valence_${clampedV}`;
  return emotionTerms[key] || "unknown";
}

// Music comparison table functionality
function setupMusicComparisonTable() {
    const musicData = [
        // {id: 360, valence: 2.50, arousal: 5.50},
        {id: 379, valence: 1.90, arousal: 2.90},
        {id: 158, valence: 2.10, arousal: 3.60},
        {id: 685, valence: 4.50, arousal: 3.60},
        {id: 833, valence: 5.00, arousal: 5.80},
        {id: 1034, valence: 3.30, arousal: 2.80},
        {id: 1133, valence: 5.00, arousal: 2.40},
        // {id: 1182, valence: 2.70, arousal: 2.20},
        {id: 1373, valence: 6.60, arousal: 5.70},
        {id: 1539, valence: 4.40, arousal: 4.70},
        {id: 1994, valence: 3.80, arousal: 3.50}, 
        {id: 739, valence:6.2, arousal:6.9},
        // {id: 1633, valence:6.5, arousal:6.3},
    ];

    const tableBody = document.getElementById('music-table-body');
    if (!tableBody) return;

    musicData.forEach(item => {
        const row = document.createElement('tr');

        // Prompt column
        const promptCell = document.createElement('td');
        const emotionTerm = findClosestEmotionTerm(item.valence, item.arousal);
        promptCell.textContent = `V: ${item.valence.toFixed(2)}, A: ${item.arousal.toFixed(2)} - ${emotionTerm}`;
        promptCell.className = 'prompt-cell';
        row.appendChild(promptCell);

        // Audio player columns for each system
        const systems = ['gt', 'emotion_text_prompting', 'ce_finetuning', 'laragen'];
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
