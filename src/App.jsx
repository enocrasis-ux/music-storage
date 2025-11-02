import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// =================================================================
// 1. CONFIGURAZIONE UTENTI e DATI (Estratti dai file XLS)
// =================================================================

// Dati utenti confermati:
const USERS = [
    { username: 'apprendisti', password: 'boaz1', level: 1 },
    { username: 'compagni', password: 'jakin2', level: 2 },
    { username: 'maestri', password: '3tubalcain', level: 3 },
];

// Catalogo musicale con la corretta mappatura delle colonne, inclusa quella del Pulsante:
const MUSIC_CATALOG = [
    // La struttura è: { title: "Titolo Brano", menu1: "Categoria", menu2: "Sottocategoria", level: X, buttonName: "Nome del pulsante", url: "URL Raw Completo" }
    { title: 'Ingresso e Squadratura', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Ingresso e Squadratura', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Squadratura%20Tempio%20(%20Cantigas%20de%20Santa%20Maria%20142).mp3' },
    { title: 'Rassegna Sorveglianti', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Rassegna Sorveglianti', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Rassegna%20Sorveglianti%20(Cantigas%20De%20Santa%20Maria%20-%20Introduzione).mp3' },
    { title: 'Apertura Lavori', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Apertura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/3.%20Apertura%20Lavori%20(P.%20Glass%20-%20Mishima%20-%20Opening).mp3' },
    { title: 'Accensione Luci', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Accensione Luci', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/4.%20Accensione%20Luci%20(A.%20Vivaldi%20-%20Allegro%20Concerto%20per%20violino%20RV%20183).mp3' },
    { title: 'Spegnimento Luci', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Spegnimento Luci', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Spegnimento%20Luci%20(P.%20Glass%20-%20Mishima%20Closing).mp3' },
    { title: 'Tronco della Vedova', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Tronco della Vedova', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Tronco%20della%20Vedova%20(Cantigas%20de%20Santa%20Maria%20141).mp3' },
    { title: 'Marcia Diaconale', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Marcia Diaconale', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/3.%20Marcia%20Diaconale%20(D.G.A.%20S.%20M.%20-%20Introduzione).mp3' },
    { title: 'Preparazione del Tempio', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Preparazione del Tempio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Preparazione%20del%20tempio%20(Attala%20Fugiens%20Fuga%20XLV%20Sol%20et%20ejus%20umbra%20perficiunt%20opus).mp3' },
    { title: 'Ingresso Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ingresso Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Ingresso%20Profano%20(J.S.%20Bach%20-%20Invenzione%20a%202%20n.8%20Fa%20Maggiore%20BWV%20779).mp3' },
    { title: '2° Viaggio', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: '2° Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/3.%20II%C2%B0%20Viaggio%20(A.%20P%C3%A4rt%20-%20Fratres).mp3' },
    { title: 'Prova Acqua', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Acqua', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/4.%20Prova%20Acqua%20(G.%20Faur%C3%A9%20-%20Pell%C3%A9as%20et%20M%C3%A9lisande%20Sicilienne).mp3' },
    { title: 'Prova Aria', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Aria', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/5.%20Prova%20Aria%20(J.S.%20Bach%20-%20Aria%20sulla%20IV%C2%B0%20corda).mp3' },
    { title: 'Prova Fuoco', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Fuoco', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/6.%20Prova%20Fuoco%20(A.Vivaldi%20-%20Allegro%20Concerto%20Violino%20RV%20310).mp3' },
    { title: 'Uscita Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Uscita Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/7.%20Uscita%20Profano%20(D.G.A.S.M.-Preludio%20dopo%20il%20Sacrificio).mp3' },
    { title: 'Rientro Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Rientro Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/8.%20Rientro%20Profano%20(J.S.%20Bach%20-%20Invenzione%20a%202%20n.8%20Fa%20Maggiore%20BWV%20779).mp3' },
    { title: 'Iniziazione', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Iniziazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/9.%20Iniziazione%20(Mozart%20-%20Massonica%20K%20477).mp3' },
    { title: 'Ricreazione', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ricreazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/10.%20Ricreazione%20(P.%20Glass%20-%20Metamorphosis%202).mp3' },
    { title: 'Ingresso Apprendista', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ingresso Apprendista', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/11.%20Ingresso%20Apprendista%20(Attala%20Fugiens%20Fuga%20XXI%20Fac%20ex%20mare%20et%20foemina%20circulum,%20inde%20quadrangulum,%20hinc...).mp3' },
    { title: 'Triplice Batteria', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Triplice Batteria', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/12.%20Triplice%20Batteria%20(J.S.%20Bach%20-%20Invenzione%20a%202%20n.8%20Fa%20Maggiore%20BWV%20779)-1.mp3' },
    
    // Contenuti Livello 2 (Compagno)
    { title: 'Apertura Lavori', menu1: 'Compagno', menu2: 'Apertura Lavori', level: 2, buttonName: 'Apertura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Apertura%20Lavori%20(P.%20Glass%20-%20Mishima%20-%20Opening).mp3' },
    { title: 'Preparazione', menu1: 'Compagno', menu2: 'Apertura Lavori', level: 2, buttonName: 'Preparazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Preparazione%20(Attala%20Fugiens%20Fuga%20XLV%20Sol%20et%20ejus%20umbra%20perficiunt%20opus).mp3' },
    { title: 'Chiusura Lavori', menu1: 'Compagno', menu2: 'Chiusura Lavori', level: 2, buttonName: 'Chiusura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Chiusura%20Lavori%20(P.%20Glass%20-%20Mishima%20Closing).mp3' },
    { title: 'Preparazione', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Preparazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Preparazione%20(Attala%20Fugiens%20Fuga%20XLV%20Sol%20et%20ejus%20umbra%20perficiunt%20opus).mp3' },
    { title: 'Ingresso Fratello', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Ingresso Fratello', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Ingresso%20Fratello%20(J.S.%20Bach%20-%20Invenzione%20a%202%20n.8%20Fa%20Maggiore%20BWV%20779).mp3' },
    { title: 'Primo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Primo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/3.%20I%C2%B0%20Viaggio%20(A.%20P%C3%A4rt%20-%20Fratres).mp3' },
    { title: 'Secondo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Secondo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/4.%20II%C2%B0%20Viaggio%20(G.%20Faur%C3%A9%20-%20Pell%C3%A9as%20et%20M%C3%A9lisande%20Sicilienne).mp3' },
    { title: 'Terzo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Terzo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/5.%20III%C2%B0%20Viaggio%20(J.S.%20Bach%20-%20Aria%20sulla%20IV%C2%B0%20corda).mp3' },
    { title: 'Quarto Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Quarto Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/6.%20IV%C2%B0%20Viaggio%20(A.Vivaldi%20-%20Allegro%20Concerto%20Violino%20RV%20310).mp3' },
    { title: 'Quinto Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Quinto Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/7.%20V%C2%B0%20Viaggio%20(D.G.A.S.M.-Preludio%20dopo%20il%20Sacrificio).mp3' },
    { title: 'Promozione', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Promozione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/8.%20Promozione%20(Mozart%20-%20Massonica%20K%20477).mp3' },

    // Contenuti Livello 3 (Maestro)
    { title: 'Ripresa Lavori', menu1: 'Maestro', menu2: 'Ripresa Lavori', level: 3, buttonName: 'Ripresa Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/1.%20Ripresa%20Lavori%20(P.%20Glass%20-%20Mishima%20-%20Opening).mp3' },
    { title: 'Preparazione', menu1: 'Maestro', menu2: 'Ripresa Lavori', level: 3, buttonName: 'Preparazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/2.%20Preparazione%20(Attala%20Fugiens%20Fuga%20XXI%20Fac%20ex%20mare%20et%20foemina%20circulum,%20inde%20quadrangulum,%20hinc...)-1.mp3' },
    { title: 'Sospensione', menu1: 'Maestro', menu2: 'Sospensione Lavori', level: 3, buttonName: 'Sospensione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/3.%20Chiusura%20Lavori%20(Handel%20-%20Solomon%20Overture).mp3' },
    { title: 'Ingresso Fratello', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Ingresso Fr.', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/4.%20Ingresso%20del%20Compagno%20(Handel%20-%20Sarabande).mp3' },
    { title: 'Deposizione bara', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Deposizione bara', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/5.%20Deposizione%20nella%20bara%20(R.%20Wagner%20-%20Marcia%20Funebre%20Sigfrido).mp3' },
    { title: 'Viaggio Maestri', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Viaggio Maestri', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/6.%20Viaggio%20dei%20Maestri%20(Cantigas%20de%20Santa%20Maria%20141).mp3' },
    { title: 'Resumezione', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Resumezione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/7.%20Resumezione%20(J.S.%20Bach%20-%20Invenzione%20a%202%20n.8%20Fa%20Maggiore%20BWV%20779).mp3' },
    { title: 'Promessa Solenne', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Promessa Sol.', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/8.%20Promessa%20Solenne%20(Mozart%20-%20Massonica%20K%20477).mp3' },
    { title: 'Ricreazione', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Ricreazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/refs/heads/main/9.%20Ricreazione%20(P.%20Glass%20-%20Metamorphosis%202).mp3' },
];

// =================================================================
// 2. COMPONENTE LOGIN
// =================================================================

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Cerca l'utente esattamente come definito nella configurazione
        const user = USERS.find(u => u.username === username && u.password === password);
        
        if (user) {
            onLogin(user.level, user.username);
        } else {
            setError('Username o Password non validi.');
        }
    };

    return (
        <div style={styles.loginContainer}>
            <h1>Music Player PWA</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Accedi</button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
            <p style={styles.disclaimer}>Accesso solo per utenti autorizzati.</p>
        </div>
    );
};

// =================================================================
// 3. LOGICA DI RIPRODUZIONE AUDIO E NAVIGAZIONE
// =================================================================

const AudioPlayer = ({ tracks, userLevel, username, onLogout }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [menuLevel, setMenuLevel] = useState('menu1'); // 'menu1', 'menu2', 'tracks'
    const [selectedMenu1, setSelectedMenu1] = useState(null);
    const [selectedMenu2, setSelectedMenu2] = useState(null);
    const audioRef = useRef(new Audio());
    audioRef.current.loop = false; 

    // Gestione dell'evento 'ended' e pulizia
    useEffect(() => {
        const audio = audioRef.current;
        
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTrack(null);
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.pause(); 
        };
    }, []);

    // Filtra i brani in base al livello di accesso: Livello utente >= Livello brano
    const getFilteredTracks = () => {
        return tracks.filter(track => track.level <= userLevel);
    };

    const handleTrackClick = (track) => {
        const audio = audioRef.current;
        
        if (currentTrack && currentTrack.url === track.url) {
            // Tap sullo stesso brano: Interrompi/Pausa/Riprendi
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
            // Tap su un nuovo brano: Interrompi precedente e avvia nuovo
            audio.pause(); 

            audio.src = track.url;
            audio.play()
                .then(() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                })
                .catch(error => {
                    console.error("Errore nella riproduzione dell'audio:", error);
                    alert("Impossibile riprodurre il brano. Controlla la connessione internet e l'URL del brano.");
                    setIsPlaying(false);
                });
        }
    };

    // Costruzione dinamica dei menu
    const filteredTracks = getFilteredTracks();

    // Menu 1: Categorie uniche accessibili
    const menu1Options = Array.from(new Set(filteredTracks.map(t => t.menu1)));

    // Menu 2: Sottocategorie uniche per la Categoria selezionata
    const menu2Options = selectedMenu1 
        ? Array.from(new Set(filteredTracks
            .filter(t => t.menu1 === selectedMenu1)
            .map(t => t.menu2)))
        : [];

    // Brani finali: Brani che corrispondono a Menu 1 e Menu 2 selezionati
    const finalTracks = selectedMenu2
        ? filteredTracks.filter(t => t.menu1 === selectedMenu1 && t.menu2 === selectedMenu2)
        : [];

    // Funzioni di navigazione
    const handleMenu1Select = (menu1) => {
        setSelectedMenu1(menu1);
        setSelectedMenu2(null);
        setMenuLevel('menu2');
    };

    const handleMenu2Select = (menu2) => {
        setSelectedMenu2(menu2);
        setMenuLevel('tracks');
    };

    const handleBack = () => {
        if (menuLevel === 'tracks') {
            setMenuLevel('menu2');
            setSelectedMenu2(null);
        } else if (menuLevel === 'menu2') {
            setMenuLevel('menu1');
            setSelectedMenu1(null);
        }
    };
    
    // Gestione del logout
    const handleLogoutAndStop = () => {
        audioRef.current.pause(); 
        onLogout(); 
    };

    return (
        <div style={styles.appContainer}>
            <header style={styles.header}>
                <p>Utente: **{username}** (Livello **{userLevel}**)</p>
                <button onClick={handleLogoutAndStop} style={styles.logoutButton}>Logout</button>
            </header>
            
            <div style={styles.navigation}>
                {/* Pulsante Indietro */}
                {menuLevel !== 'menu1' && 
                    <button onClick={handleBack} style={styles.backButton}>&larr; Indietro</button>
                }
                
                {/* Titolo Sezione */}
                {menuLevel === 'menu1' && <h2>Seleziona Categoria</h2>}
                {menuLevel === 'menu2' && <h2>Sottomenù di: {selectedMenu1}</h2>}
                {menuLevel === 'tracks' && <h2>Brani in: {selectedMenu2}</h2>}
            </div>
            
            <div style={styles.content}>
                {/* Visualizzazione Menu 1 (Categorie) */}
                {menuLevel === 'menu1' && menu1Options.map(menu1 => (
                    <button key={menu1} onClick={() => handleMenu1Select(menu1)} style={styles.menuButton}>
                        {menu1}
                    </button>
                ))}

                {/* Visualizzazione Menu 2 (Sottomenù) */}
                {menuLevel === 'menu2' && menu2Options.map(menu2 => (
                    <button key={menu2} onClick={() => handleMenu2Select(menu2)} style={styles.menuButton}>
                        {menu2}
                    </button>
                ))}

                {/* Visualizzazione Brani (Pulsanti) */}
                {menuLevel === 'tracks' && finalTracks.map(track => (
                    <button 
                        key={track.url} 
                        onClick={() => handleTrackClick(track)} 
                        style={{
                            ...styles.trackButton,
                            // Colore dinamico in base allo stato di riproduzione
                            backgroundColor: currentTrack?.url === track.url ? (isPlaying ? '#5cb85c' : '#ffc107') : '#007bff', 
                        }}
                    >
                        {/* Utilizza il campo buttonName */}
                        **{track.buttonName}**
                        {currentTrack?.url === track.url && isPlaying && <span style={styles.playingIndicator}> (Play)</span>}
                        {currentTrack?.url === track.url && !isPlaying && <span style={styles.pausedIndicator}> (Pausa)</span>}
                    </button>
                ))}
            </div>

            {/* Display Brano in Riproduzione nel Footer */}
            {currentTrack && (
                <footer style={styles.footer}>
                    <p>
                        **In ascolto:** {currentTrack.title} 
                        <br/>Pulsante: {currentTrack.buttonName}
                    </p>
                </footer>
            )}
        </div>
    );
};

// =================================================================
// 4. COMPONENTE PRINCIPALE E STILI
// =================================================================

const App = () => {
    // Stato per utente: null = non autenticato
    const [userLevel, setUserLevel] = useState(null); 
    const [username, setUsername] = useState(null);

    const handleLogin = (level, uname) => {
        setUserLevel(level);
        setUsername(uname);
    };
    
    const handleLogout = () => {
        setUserLevel(null); 
        setUsername(null);
