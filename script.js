document.addEventListener("DOMContentLoaded", function() {
    const soundListElement = document.getElementById("sound-list");
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const seekBar = document.getElementById("seekBar");
    const volumeControl = document.getElementById("volumeControl");
    const currentTimeElement = document.getElementById("currentTime");
    const durationElement = document.getElementById("duration");

    // Link zur PHP-Datei, die die Sounds zurückgibt
    const soundSourceLink = "get-sounds.php";

    // Sounds dynamisch laden
    fetch(soundSourceLink)
        .then(response => response.json())
        .then(sounds => {
            // Wenn ein Fehler auftritt, gibt das PHP-Skript ein "error"-Feld zurück
            if (sounds.error) {
                console.error('Error:', sounds.error);
                return;
            }

            // Sound-Liste füllen
            sounds.forEach(sound => {
                const li = document.createElement("li");
                li.textContent = sound;
                li.addEventListener("click", () => {
                    playSound("sounds/" + sound);
                });
                soundListElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching sound files:', error));

    function playSound(soundUrl) {
        audioPlayer.src = soundUrl;
        audioPlayer.play();
        playPauseBtn.textContent = "Pause";
    }

    playPauseBtn.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = "Play";
        }
    });

    audioPlayer.addEventListener("timeupdate", function() {
        seekBar.value = audioPlayer.currentTime;
        currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
    });

    audioPlayer.addEventListener("loadedmetadata", function() {
        seekBar.max = audioPlayer.duration;
        durationElement.textContent = formatTime(audioPlayer.duration);
    });

    seekBar.addEventListener("input", function() {
        audioPlayer.currentTime = seekBar.value;
    });

    volumeControl.addEventListener("input", function() {
        audioPlayer.volume = volumeControl.value;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
