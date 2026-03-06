import React, { useState, useRef, useEffect } from 'react';
import '../../styles/MusicApp.css';
import {
    drakeCover,
    drakeAudio,
    daftPunkCover,
    daftPunkAudio,
    yeatCover,
    yeatAudio,
    kanyeCover,
    kanyeAudio
} from '../../images';

interface Track {
    title: string;
    artist: string;
    cover: string;
    audio: string;
}

const PLAYLIST: Track[] = [
    {
        title: 'Drake - 9',
        artist: 'Drake',
        cover: drakeCover,
        audio: drakeAudio
    },
    {
        title: 'End Of Line',
        artist: 'Daft Punk',
        cover: daftPunkCover,
        audio: daftPunkAudio
    },
    {
        title: 'Rendezvous',
        artist: 'Don Toliver and Yeat',
        cover: yeatCover,
        audio: yeatAudio
    },
    {
        title: 'Flashing Lights',
        artist: 'Kanye West',
        cover: kanyeCover,
        audio: kanyeAudio
    }
];

const MusicApp: React.FC = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            audioRef.current.volume = 1; // Default volume
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };

    const restartSong = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setProgress(0);
            if (!isPlaying) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const currentTrack = PLAYLIST[currentTrackIndex];

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        playTrack(nextIndex);
    };

    const handleBack = () => {
        // If playing for more than 3 seconds, restart the song
        if (progress > 3) {
            restartSong();
        } else {
            // Otherwise, go to previous track
            const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
            playTrack(prevIndex);
        }
    };

    const playTrack = (index: number) => {
        const wasPlaying = isPlaying;
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setCurrentTrackIndex(index);
        setProgress(0);
        // We will autoplay it in useEffect when the src changes and loadedmetadata fires
        if (wasPlaying) {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(console.error);
                    setIsPlaying(true);
                }
            }, 50); // small delay to let src update
        }
    };

    const handleVolumeUp = () => {
        if (audioRef.current) {
            audioRef.current.volume = Math.min(audioRef.current.volume + 0.1, 1);
        }
    };

    const handleVolumeDown = () => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(audioRef.current.volume - 0.1, 0);
        }
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    return (
        <div className="music-app-container">
            <audio
                ref={audioRef}
                src={currentTrack.audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleNext}
            />

            {/* Left Panel: Album Art & Info */}
            <div className="music-left-panel">
                <img src={currentTrack.cover} alt="Album Cover" className="music-cover" />
                <div className="music-overlay">
                    <h3 className="music-title">{currentTrack.title}</h3>
                    <p className="music-artist">{currentTrack.artist}</p>
                </div>
            </div>

            {/* Right Panel: Controls */}
            <div className="music-right-panel">
                <div className="ipod-wheel-container">
                    <button className="ipod-nav-btn ipod-btn-top" onClick={handleVolumeUp} title="Volume Up">+</button>
                    <button className="ipod-nav-btn ipod-btn-left" onClick={handleBack} title="Previous">&lt;--</button>
                    <button className="ipod-nav-btn ipod-btn-right" onClick={handleNext} title="Next">--&gt;</button>
                    <button className="ipod-nav-btn ipod-btn-bottom" onClick={handleVolumeDown} title="Volume Down">-</button>

                    <button className="ipod-center-btn" onClick={togglePlay} title="Play/Pause">
                        <span className={`play-pause-icon ${isPlaying ? 'playing' : 'paused'}`}>
                            {isPlaying ? '||' : '▶'}
                        </span>
                    </button>
                </div>

                <div className="music-progress-container">
                    <input
                        type="range"
                        className="music-progress"
                        min={0}
                        max={duration || 100}
                        value={progress}
                        onChange={handleProgressChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicApp;
