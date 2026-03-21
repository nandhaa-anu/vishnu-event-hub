import ClickSpark from "./components/ClickSpark";
import PillNav from "./components/PillNav";
import Home from "./views/Home";
import Events from "./views/Events";
import Gallery from "./views/Gallery";
import Team from "./views/Team";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Team', href: '/team' },
        { label: 'Signup', href: '/signup' },
        { label: 'Login', href: '/login' }
    ];

    return (
        <Router>
            <ClickSpark>
                <Toaster position="top-center" toastOptions={{ style: { background: '#0a0a0a', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
                <PillNav
                    logo="https://www.gstatic.com/devrel-devsite/prod/v773998f45a7071660f6176378e90e7a177306fbc8a1ef97d622614a8f33b6645/developers/images/touchicon-180.png"
                    items={navItems}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </ClickSpark>
        </Router>
    );
}

export default App;
