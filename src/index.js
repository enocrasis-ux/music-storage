import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// =================================================================
// 1. CONFIGURAZIONE UTENTI e DATI (Lasciata intatta)
// =================================================================

// Dati utenti confermati:
const USERS = [
    { username: 'apprendisti', password: 'boaz1', level: 1 },
    { username: 'compagni', password: 'jakin2', level: 2 },
    { username: 'maestri', password: '3tubalcain', level: 3 },
];

// Catalogo musicale con la corretta mappatura delle colonne.
// GLI URL SONO STATI MANTENUTI ESATTAMENTE COME FORNITI DALL'UTENTE.
const MUSIC_CATALOG = [
    // La struttura è: { title: "Titolo Brano", menu1: "Categoria", menu2: "Sottocategoria", level: X, buttonName: "Nome del pulsante", url: "URL Raw Completo" }
    { title: 'Ingresso e Squadratura', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Ingresso e Squadratura', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/1_IngressoSquadratura_Primo.mp3' },
    { title: 'Rassegna Sorveglianti', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Rassegna Sorveglianti', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/2_RassegnaSorveglianti_Primo.mp3' },
    { title: 'Apertura Lavori', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Apertura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/3_AperturaLavori_Primo.mp3' },
    { title: 'Accensione Luci', menu1: 'Apprendista', menu2: 'Apertura Lavori', level: 1, buttonName: 'Accensione Luci', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/4_AccensioneLuci_Primo.mp3' },
    { title: 'Tronco della Vedova', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Tronco della Vedova', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/5_TroncoVedova.mp3' },
    { title: 'Marcia Diaconi', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Marcia Diaconi', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/6_MarciaDiaconi.mp3' },
    { title: 'Spegnimento Luci', menu1: 'Apprendista', menu2: 'Chiusura Lavori', level: 1, buttonName: 'Spegnimento Luci', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/7_SpegnimentoLuci_Primo.mp3' },
    { title: 'Preparazione del Tempio', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Preparazione del Tempio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/8_PreparazioneTempioIniziazione_Primo.mp3' },
    { title: 'Ingresso Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ingresso Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/9_IngressoUscitaProfano.mp3' },
    { title: '2° Viaggio', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: '2° Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/10_SecondoViaggioProfanoRumori.mp3' },
    { title: 'Prova Acqua', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Acqua', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/11_ProvaAcqua.mp3' },
    { title: 'Prova Aria', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Aria', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/12_ProvaAria.mp3' },
    { title: 'Prova Fuoco', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Prova Fuoco', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/13_ProvaFuoco.mp3' },
    { title: 'Uscita Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Uscita Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/9_IngressoUscitaProfano.mp3' },
    { title: 'Rientro Profano', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Rientro Profano', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/14_RientroProfano.mp3' },
    { title: 'Iniziazione', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Iniziazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/15_IniziazioneProfano.mp3' },
    { title: 'Ricreazione', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ricreazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/16_Ricreazione_Primo.mp3' },
    { title: 'Ingresso Apprendista', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Ingresso Apprendista', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/17_IngressoApprendistaIniziato.mp3' },
    { title: 'Triplice Batteria', menu1: 'Apprendista', menu2: 'Iniziazione', level: 1, buttonName: 'Triplice Batteria', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/18_InnoGioiaBatteria.mp3' },
    
    // Contenuti Livello 2 (Compagno)
    { title: 'Apertura Lavori', menu1: 'Compagno', menu2: 'Apertura Lavori', level: 2, buttonName: 'Preparazione Tempio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/1_PreparazioneTempio_Secondo.mp3' },
    { title: 'Preparazione', menu1: 'Compagno', menu2: 'Apertura Lavori', level: 2, buttonName: 'Apertura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/2_AperturaChiusuraLavori_Secondo.mp3' },
    { title: 'Chiusura Lavori', menu1: 'Compagno', menu2: 'Chiusura Lavori', level: 2, buttonName: 'Chiusura Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/2_AperturaChiusuraLavori_Secondo.mp3' },
    { title: 'Preparazione', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Preparazione Tempio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/1_PreparazioneTempio_Secondo.mp3' },
    { title: 'Ingresso Fratello', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Ingresso Apprendista', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/5_IngressoApprendista_Secondo.mp3' },
    { title: 'Primo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Primo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/6_PrimoViaggio_Secondo.mp3' },
    { title: 'Secondo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Secondo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/7_SecondoViaggio_Secondo.mp3' },
    { title: 'Terzo Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Terzo Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/8_TerzoViaggio_Secondo.mp3' },
    { title: 'Quarto Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Quarto Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/9_QuartoViaggio_Secondo.mp3' },
    { title: 'Quinto Viaggio', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Quinto Viaggio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/10_QuintoViaggio_Secondo.mp3' },
    { title: 'Promozione', menu1: 'Compagno', menu2: 'Promozione a Compagno', level: 2, buttonName: 'Promozione', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/11_PromozioneCompagno.mp3' },

    // Contenuti Livello 3 (Maestro)
    { title: 'Ripresa Lavori', menu1: 'Maestro', menu2: 'Ripresa Lavori', level: 3, buttonName: 'Preparazione Tempio', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/1_PreparazioneTempio_Terzo.mp3' },
    { title: 'Preparazione', menu1: 'Maestro', menu2: 'Ripresa Lavori', level: 3, buttonName: 'Ripresa Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/2_RipresaLavori_Terzo.mp3' },
    { title: 'Sospensione', menu1: 'Maestro', menu2: 'Sospensione Lavori', level: 3, buttonName: 'Sospensione Lavori', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/3_SospensioneLavori_Terzo.mp3' },
    { title: 'Ingresso Fratello', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Ingresso Compagno', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/4_IngressoCompagno_Terzo.mp3' },
    { title: 'Deposizione bara', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Deposizione bara', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/5_DeposizioneBara_Terzo.mp3' },
    { title: 'Viaggio Maestri', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Viaggio Maestri', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/6_ViaggioMaestri_Terzo.mp3' },
    { title: 'Resumezione', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Resurrezione', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/7_Resurrezione_Terzo.mp3' },
    { title: 'Promessa Solenne', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Promessa Solenne', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/8_PromessaSolenne_Terzo.mp3' },
    { title: 'Ricreazione', menu1: 'Maestro', menu2: 'Elevazione a Maestro', level: 3, buttonName: 'Ricreazione', url: 'https://github.com/enocrasis-ux/music-storage/raw/main/9_Ricreazione_Terzo.mp3' },
];

// =================================================================
// 2. LOGICA DEI COLORI E STILI (TEMA DINAMICO)
// =================================================================

// Funzione per definire la palette in base al livello utente
const getLevelColors = (level) => {
    // Colore di contrasto per lo stato Pausa (Giallo, comune a tutti)
    const PAUSE_COLOR = '#FFC107'; 
    const PAUSE_TEXT_COLOR = '#000000'; // Testo nero su giallo

    switch (level) {
        case 1: // Apprendista: Bianco e Nero
            return {
                primaryBackground: '#1A1A1A', // Sfondo scuro comune
                accent: '#E0E0E0', // Pulsante base grigio chiaro
                text: '#000000', // Testo scuro sui pulsanti chiari
                active: '#FFFFFF', // Pulsante attivo Bianco (Play)
                paused: PAUSE_COLOR, 
                pausedText: PAUSE_TEXT_COLOR,
                headerText: '#FFFFFF', 
                borderColor: '#666666'
            };
        case 2: // Compagno: Verde e Nero
            return {
                primaryBackground: '#1A1A1A',
                accent: '#4CAF50', // Pulsante base Verde
                text: '#FFFFFF',
                active: '#81C784', // Verde chiaro (Play)
                paused: PAUSE_COLOR, 
                pausedText: PAUSE_TEXT_COLOR,
                headerText: '#4CAF50',
                borderColor: '#4CAF50'
            };
        case 3: // Maestro: Rosso e Nero
            return {
                primaryBackground: '#1A1A1A',
                accent: '#F44336', // Pulsante base Rosso
                text: '#FFFFFF',
                active: '#E57373', // Rosso chiaro (Play)
                paused: PAUSE_COLOR,
                pausedText: PAUSE_TEXT_COLOR,
                headerText: '#F44336',
                borderColor: '#F44336'
            };
        default:
            return {
                primaryBackground: '#1A1A1A',
                accent: '#007bff',
                text: '#FFFFFF',
                active: '#5cb85c',
                paused: PAUSE_COLOR,
                pausedText: PAUSE_TEXT_COLOR,
                headerText: '#FFFFFF',
                borderColor: '#007bff'
            };
    }
};

// Stili CSS di base (Inline per semplicità)
const styles = {
    // Stili Globali e Layout
    appContainer: (level) => {
        const colors = getLevelColors(level);
        return {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: colors.primaryBackground, // Sfondo scuro dinamico
            color: '#FFFFFF', // Colore testo di base (bianco)
            fontFamily: 'Roboto, sans-serif',
            padding: '0 10px 80px 10px', // Spazio per il footer
        };
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
        padding: '20px',
        textAlign: 'center',
    },
    // Stili Login Screen
    loginHeader: {
        fontSize: '1.5em',
        marginBottom: '40px',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '350px',
    },
    input: {
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #666',
        backgroundColor: '#333333',
        color: '#FFFFFF',
        fontSize: '1.1em',
    },
    loginButton: {
        padding: '15px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4CAF50', // Bottone verde fisso per il login
        color: '#FFFFFF',
        fontSize: '1.2em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    },
    error: {
        color: '#F44336',
        marginTop: '10px',
        fontSize: '1em',
    },
    disclaimer: {
        marginTop: '20px',
        color: '#AAAAAA',
        fontSize: '0.9em',
    },
    // Stili Player Screen
    header: (level) => {
        const colors = getLevelColors(level);
        return {
            padding: '15px 0',
            borderBottom: `2px solid ${colors.borderColor}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            position: 'sticky',
            top: 0,
            backgroundColor: colors.primaryBackground,
            zIndex: 10,
        };
    },
    logoutButton: {
        padding: '8px 15px',
        borderRadius: '20px',
        border: '1px solid #F44336',
        backgroundColor: 'transparent',
        color: '#F44336',
        fontSize: '0.9em',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s',
    },
    navigation: {
        marginBottom: '15px',
    },
    backButton: {
        padding: '10px 15px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#333333',
        color: '#FFFFFF',
        fontSize: '1em',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    sectionTitle: {
        fontSize: '1.4em',
        fontWeight: 'normal',
        marginBottom: '15px',
        color: '#E0E0E0',
        paddingLeft: '5px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px', // Spaziatura tra i pulsanti
        padding: '0 5px',
    },
    // Stili Pulsanti Navigazione e Brani (Grandi e Arrotondati)
    // Usano la stessa base, ma il trackButton ha logica di colore complessa
    baseButton: (level) => {
        const colors = getLevelColors(level);
        return {
            padding: '20px 15px',
            borderRadius: '12px', // Arrotondati
            border: 'none',
            backgroundColor: colors.accent,
            color: colors.text,
            fontSize: '1.2em',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s, transform 0.1s',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        };
    },
    // Stili Pulsanti Brani (Tracks) - Logica dinamica di stato
    trackButton: (track, currentTrack, isPlaying, level) => {
        const colors = getLevelColors(level);
        const isActive = currentTrack?.url === track.url;
        let backgroundColor = colors.accent;
        let textColor = colors.text; 
        let indicatorText = '';

        if (isActive) {
            if (isPlaying) {
                backgroundColor = colors.active;
                // Colore testo nero su Liv. 1 (Bianco attivo)
                textColor = (level === 1) ? colors.text : '#FFFFFF'; 
                indicatorText = ' (Play)';
            } else {
                backgroundColor = colors.paused;
                textColor = colors.pausedText;
                indicatorText = ' (Pausa)';
            }
        }

        return {
            ...styles.baseButton(level), // Eredita la base
            backgroundColor: backgroundColor,
            color: textColor,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // Per il pulsante Play/Pausa
            indicatorText: indicatorText, 
        };
    },
    // Indicatori
    playingIndicator: {
        fontSize: '0.8em',
        fontWeight: 'normal',
        marginLeft: '10px',
        // Utilizzato solo per la visualizzazione del testo
    },
    pausedIndicator: {
        fontSize: '0.8em',
        fontWeight: 'normal',
        marginLeft: '10px',
        // Utilizzato solo per la visualizzazione del testo
    },
    // Footer del Player
    footer: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '10px 15px',
        backgroundColor: '#333333',
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: '0.9em',
        borderTop: '1px solid #444444',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
    },
};

// =================================================================
// 3. COMPONENTE LOGIN (Aggiornato il nome)
// =================================================================

const LoginScreen = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = USERS.find(u => u.username === username && u.password === password);
        
        if (user) {
            onLogin(user.level, user.username);
        } else {
            setError('Username o Password non validi.');
        }
    };

    return (
        <div style={styles.loginContainer}>
            <h1 style={styles.loginHeader}>Lira e Spada - Musiche ad uso del Maestro d'Armonia</h1>
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
                <button type="submit" style={styles.loginButton}>Accedi</button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
            <p style={styles.disclaimer}>Accesso solo per utenti autorizzati.</p>
        </div>
    );
};

// =================================================================
// 4. LOGICA DI RIPRODUZIONE AUDIO E NAVIGAZIONE (Adattata agli stili)
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

    // Logica di riproduzione invariata
    const handleTrackClick = (track) => {
        const audio = audioRef.current;
        
        if (currentTrack && currentTrack.url === track.url) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        } else {
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

    // Filtri e Navigazione (logica invariata)
    const filteredTracks = tracks.filter(track => track.level <= userLevel);
    const menu1Options = Array.from(new Set(filteredTracks.map(t => t.menu1)));
    const menu2Options = selectedMenu1 
        ? Array.from(new Set(filteredTracks.filter(t => t.menu1 === selectedMenu1).map(t => t.menu2)))
        : [];
    const finalTracks = selectedMenu2
        ? filteredTracks.filter(t => t.menu1 === selectedMenu1 && t.menu2 === selectedMenu2)
        : [];

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
    
    const handleLogoutAndStop = () => {
        audioRef.current.pause();  
        onLogout(); 
    };

    return (
        <div style={styles.appContainer(userLevel)}>
            <header style={styles.header(userLevel)}>
                <p style={{ color: getLevelColors(userLevel).headerText }}>Utente: **{username}** (Livello **{userLevel}**)</p>
                <button onClick={handleLogoutAndStop} style={styles.logoutButton}>Logout</button>
            </header>
            
            <div style={styles.navigation}>
                {/* Pulsante Indietro */}
                {menuLevel !== 'menu1' && 
                    <button onClick={handleBack} style={styles.backButton}>&larr; Indietro</button>
                }
                
                {/* Titolo Sezione */}
                {menuLevel === 'menu1' && <h2 style={styles.sectionTitle}>Seleziona Categoria</h2>}
                {menuLevel === 'menu2' && <h2 style={styles.sectionTitle}>Sottomenù di: {selectedMenu1}</h2>}
                {menuLevel === 'tracks' && <h2 style={styles.sectionTitle}>Brani in: {selectedMenu2}</h2>}
            </div>
            
            <div style={styles.content}>
                {/* Visualizzazione Menu 1 (Categorie) */}
                {menuLevel === 'menu1' && menu1Options.map(menu1 => (
                    <button key={menu1} onClick={() => handleMenu1Select(menu1)} style={styles.baseButton(userLevel)}>
                        {menu1}
                    </button>
                ))}

                {/* Visualizzazione Menu 2 (Sottomenù) */}
                {menuLevel === 'menu2' && menu2Options.map(menu2 => (
                    <button key={menu2} onClick={() => handleMenu2Select(menu2)} style={styles.baseButton(userLevel)}>
                        {menu2}
                    </button>
                ))}

                {/* Visualizzazione Brani (Pulsanti) */}
                {menuLevel === 'tracks' && finalTracks.map(track => {
                    // Ottiene tutti gli stili dinamici per il track
                    const trackStyle = styles.trackButton(track, currentTrack, isPlaying, userLevel);
                    
                    return (
                        <button 
                            key={track.url} 
                            onClick={() => handleTrackClick(track)} 
                            style={trackStyle}
                        >
                            {/* Utilizza il campo buttonName */}
                            <span style={{textAlign: 'left', flexGrow: 1}}>{track.buttonName}</span>
                            {/* Indicatori dinamici */}
                            {currentTrack?.url === track.url && isPlaying && <span style={styles.playingIndicator}>{trackStyle.indicatorText}</span>}
                            {currentTrack?.url === track.url && !isPlaying && <span style={{...styles.pausedIndicator, color: getLevelColors(userLevel).pausedText}}>{trackStyle.indicatorText}</span>}
                        </button>
                    );
                })}
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
// 5. COMPONENTE PRINCIPALE E ROOT
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
    }; 

    if (!userLevel) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <AudioPlayer 
            tracks={MUSIC_CATALOG} 
            userLevel={userLevel} 
            username={username}
            onLogout={handleLogout} 
        />
    );
};

// PUNTO DI INGRESSO (ROOT)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
