import ClickSpark from "./components/ClickSpark";
import PillNav from "./components/PillNav";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: 'Gallery', href: '/gallery' },
        { label: 'Team', href: '/team' },
        { label: 'Signup', href: '/signup' }
    ];

    return (
        <Router>
            <ClickSpark>
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
                </Routes>
            </ClickSpark>
        </Router>
    );
}

export default App;
