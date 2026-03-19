import ChromaGrid from "../components/ChromaGrid";
import GradientText from "../components/GradientText";

const eventsData = [
    {
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        title: 'Cloud DevFest 2026',
        subtitle: 'Full-day technical conference',
        handle: 'GDG_CLOUD',
        borderColor: '#4285F4',
        gradient: 'linear-gradient(145deg, #4285F4, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1591115765373-520b7a2d7a3d?w=800&q=80',
        title: 'Android Build-a-thon',
        subtitle: '48H Innovative Hackathon',
        handle: 'ANDROID_LABS',
        borderColor: '#0F9D58',
        gradient: 'linear-gradient(210deg, #0F9D58, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        title: 'WTM Tech Summit',
        subtitle: 'Celebrating Women in Tech',
        handle: 'WTM_GLOBAL',
        borderColor: '#DB4437',
        gradient: 'linear-gradient(165deg, #DB4437, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
        title: 'Firebase Workshop',
        subtitle: 'Backend made simple',
        handle: 'FIREBASE_PROTO',
        borderColor: '#F4B400',
        gradient: 'linear-gradient(195deg, #F4B400, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
        title: 'AI/ML Bootcamp',
        subtitle: 'Mastering TensorFlow',
        handle: 'AI_STUDIO',
        borderColor: '#8B5CF6',
        gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
        title: 'UI/UX Design Jam',
        subtitle: 'Figma to Code',
        handle: 'DESIGN_OPS',
        borderColor: '#06B6D4',
        gradient: 'linear-gradient(135deg, #06B6D4, #000)',
        url: '#'
    }
];

const Events = () => {
    return (
        <div className="min-h-screen bg-black text-white py-32 px-6 flex flex-col items-center">
            <div className="text-center mb-20 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
                    <GradientText colors={['#fff', '#666', '#fff']}>Active Nodes</GradientText>
                </h2>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                    Synchronize with the latest technological developments.
                </p>
            </div>

            <div className="w-full max-w-7xl">
                <ChromaGrid items={eventsData} columns={3} rows={2} />
            </div>

            <div className="mt-20 flex gap-4 opacity-30">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-2 h-2 bg-white rounded-full scale-animation" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
            </div>
        </div>
    );
};

export default Events;
