import ChromaGrid from "../components/ChromaGrid";
import GradientText from "../components/GradientText";

const teamData = [
    {
        image: 'https://i.pravatar.cc/300?img=12',
        title: 'Dr. Vishnu Vardhan',
        subtitle: 'Faculty Advisor',
        handle: '@director_office',
        borderColor: '#4285F4',
        gradient: 'linear-gradient(145deg, #4285F4, #000)',
        url: '#'
    },
    {
        image: 'https://i.pravatar.cc/300?img=20',
        title: 'Aryan Sharma',
        subtitle: 'GDG Lead',
        handle: '@aryan_dev',
        borderColor: '#0F9D58',
        gradient: 'linear-gradient(210deg, #0F9D58, #000)',
        url: '#'
    },
    {
        image: 'https://i.pravatar.cc/300?img=5',
        title: 'Ananya Rao',
        subtitle: 'Operations Lead',
        handle: '@ananya_ops',
        borderColor: '#DB4437',
        gradient: 'linear-gradient(165deg, #DB4437, #000)',
        url: '#'
    },
    {
        image: 'https://i.pravatar.cc/300?img=68',
        title: 'Vikram Singh',
        subtitle: 'Technical Lead',
        handle: '@vix_code',
        borderColor: '#F4B400',
        gradient: 'linear-gradient(195deg, #F4B400, #000)',
        url: '#'
    }
];

const Team = () => {
    return (
        <div className="min-h-screen bg-black text-white py-32 px-6 flex flex-col items-center">
            <div className="text-center mb-20 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
                    <GradientText colors={['#fff', '#999', '#fff']}>The Team</GradientText>
                </h2>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                    The architects of the future.
                </p>
            </div>

            <div className="w-full max-w-7xl">
                <ChromaGrid items={teamData} columns={4} rows={1} />
            </div>
        </div>
    );
};

export default Team;
