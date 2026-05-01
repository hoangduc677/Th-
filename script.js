// DOM Elements - Safe checking
const elements = {};
const selectors = [
    'intro', 'skipIntro', 'loginScreen', 'nicknameInput', 'enterBtn',
    'mainContent', 'userName', 'musicToggle', 'backgroundMusic',
    'lightbox', 'lightboxImg', 'lightboxClose'
];

selectors.forEach(id => {
    elements[id] = document.getElementById(id);
});

// Failsafe: Hide intro after 10s max
setTimeout(() => {
    if (elements.intro) {
        elements.intro.style.display = 'none';
        showLogin();
    }
}, 10000);

// Intro Animation
function initIntro() {
    const lines = document.querySelectorAll('.intro-line');
    let currentLine = 0;

    function showNextLine() {
        if (currentLine > 0) {
            lines[currentLine - 1].classList.remove('active');
        }
        if (currentLine < lines.length) {
            lines[currentLine].classList.add('active');
            currentLine++;
            setTimeout(showNextLine, 1500);
        } else {
            setTimeout(() => {
                endIntro();
            }, 2000);
        }
    }

    showNextLine();
}

// Skip Intro
if (elements.skipIntro) {
    elements.skipIntro.addEventListener('click', endIntro);
}

// End Intro & Show Login
function endIntro() {
    if (elements.intro) {
        elements.intro.style.opacity = '0';
        setTimeout(() => {
            elements.intro.style.display = 'none';
            showLogin();
        }, 500);
    }
}

function showLogin() {
    if (elements.loginScreen) {
        elements.loginScreen.style.display = 'flex';
    }
}

// Login
function initLogin() {
    if (!elements.enterBtn || !elements.nicknameInput) return;

    // Check if already logged in
    const savedName = localStorage.getItem('userNickname');
    if (savedName) {
        setUserName(savedName);
        showMainContent();
        return;
    }

    elements.enterBtn.addEventListener('click', handleLogin);
    elements.nicknameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

function handleLogin() {
    const nickname = elements.nicknameInput.value.trim();
    if (nickname) {
        localStorage.setItem('userNickname', nickname);
        setUserName(nickname);
        elements.loginScreen.style.display = 'none';
        showMainContent();
    }
}

function setUserName(name) {
    if (elements.userName) {
        elements.userName.textContent = `👤 ${name}`;
    }
}

function showMainContent() {
    if (elements.mainContent) {
        elements.mainContent.classList.remove('hidden');
    }
}

// Music Control
function initMusic() {
    if (!elements.musicToggle || !elements.backgroundMusic) return;

    let isPlaying = false;
    const playIcon = elements.musicToggle.querySelector('.play-icon');
    const pauseIcon = elements.musicToggle.querySelector('.pause-icon');

    elements.musicToggle.addEventListener('click', async () => {
        try {
            if (isPlaying) {
                elements.backgroundMusic.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                isPlaying = false;
            } else {
                await elements.backgroundMusic.play();
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                isPlaying = true;
            }
        } catch (error) {
            console.log('Audio play failed - user interaction required');
        }
    });

    // Handle audio events
    elements.backgroundMusic.addEventListener('play', () => {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    });

    elements.backgroundMusic.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    });
}

// Lightbox
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && elements.lightboxImg && elements.lightbox) {
                elements.lightboxImg.src = img.src;
                elements.lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (elements.lightboxClose) {
        elements.lightboxClose.addEventListener('click', closeLightbox);
    }

    if (elements.lightbox) {
        elements.lightbox.addEventListener('click', (e) => {
            if (e.target === elements.lightbox) {
                closeLightbox();
            }
        });
    }
}

function closeLightbox() {
    if (elements.lightbox) {
        elements.lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start intro
    setTimeout(initIntro, 500);
    
    // Initialize all features
    initLogin();
    initMusic();
    initLightbox();
    
    // Smooth scroll prevention
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 100);
});

// Error prevention - window unload
window.addEventListener('beforeunload', () => {
    if (elements.backgroundMusic) {
        elements.backgroundMusic.pause();
    }
});
