import Masonry from "../components/Masonry";
import GradientText from "../components/GradientText";

const galleryItems = [
    { id: 1, img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', height: 600, url: '#' },
    { id: 2, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', height: 400, url: '#' },
    { id: 3, img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', height: 500, url: '#' },
    { id: 4, img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', height: 450, url: '#' },
    { id: 5, img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', height: 700, url: '#' },
    { id: 6, img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', height: 550, url: '#' },
    { id: 7, img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80', height: 400, url: '#' },
    { id: 8, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', height: 600, url: '#' },
    { id: 9, img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', height: 500, url: '#' }
];

const Gallery = () => {
    return (
        <div className="min-h-screen bg-black text-white py-32 px-6 flex flex-col items-center">
            <div className="text-center mb-20 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
                    <GradientText colors={['#fff', '#4285F4', '#DB4437', '#fff']}>Gallery</GradientText>
                </h2>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                    Capturing the innovation milestones.
                </p>
            </div>

            <div className="w-full max-w-7xl h-[1200px]">
                <Masonry
                    items={galleryItems}
                    animateFrom="bottom"
                    stagger={0.05}
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                />
            </div>
        </div>
    );
};

export default Gallery;
