export const eventsData = [
    {
        id: 'evt-001',
        title: 'TechNova Hackathon 2026',
        category: 'Technical',
        date: 'Oct 15, 2026',
        time: '09:00 AM - 09:00 PM',
        venue: 'Main Auditorium, Block A',
        organizer: 'Coding Club',
        description: 'A 12-hour intense hackathon focusing on AI and Web3 solutions. Build innovative products and win exciting prizes!',
        guestSpeaker: 'Dr. Alan Turing, AI Researcher',
        seatLimit: 200,
        registeredCount: 154,
        image: 'linear-gradient(135deg, #3B82F6, #06B6D4)'
    },
    {
        id: 'evt-002',
        title: 'Symphony Cultural Fest',
        category: 'Cultural',
        date: 'Nov 02, 2026',
        time: '04:00 PM - 10:00 PM',
        venue: 'Open Air Theatre',
        organizer: 'Cultural Committee',
        description: 'Annual cultural extravaganza featuring dance, music, and drama performances from talented students across all departments.',
        guestSpeaker: 'None',
        seatLimit: 1000,
        registeredCount: 890,
        image: 'linear-gradient(135deg, #F59E0B, #EF4444)'
    },
    {
        id: 'evt-003',
        title: 'Advanced React Workshop',
        category: 'Workshop',
        date: 'Sep 28, 2026',
        time: '10:00 AM - 01:00 PM',
        venue: 'Lab 4, IT Block',
        organizer: 'Web Dev Society',
        description: 'Deep dive into React performance optimization, custom hooks, and state management using Redux and Context API.',
        guestSpeaker: 'Sarah Jenks, Senior Frontend Engineer',
        seatLimit: 60,
        registeredCount: 60,
        image: 'linear-gradient(135deg, #10B981, #3B82F6)'
    },
    {
        id: 'evt-004',
        title: 'RoboWars Championship',
        category: 'Technical',
        date: 'Dec 10, 2026',
        time: '10:00 AM - 05:00 PM',
        venue: 'Mechanical Ground',
        organizer: 'Robotics Club',
        description: 'Design, build, and battle your robots in the ultimate arena. Categories include 15kg and 60kg combat robots.',
        guestSpeaker: 'None',
        seatLimit: 300,
        registeredCount: 120,
        image: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
    },
    {
        id: 'evt-005',
        title: 'Startup Pitch Deck',
        category: 'Seminar',
        date: 'Oct 05, 2026',
        time: '02:00 PM - 05:00 PM',
        venue: 'Seminar Hall, MBA Block',
        organizer: 'Entrepreneurship Cell',
        description: 'Pitch your startup ideas to a panel of angel investors and industry experts. Get funded and mentored!',
        guestSpeaker: 'Ravi Kumar, Partner at Sequoia',
        seatLimit: 150,
        registeredCount: 45,
        image: 'linear-gradient(135deg, #EC4899, #F43F5E)'
    },
    {
        id: 'evt-006',
        title: 'Cloud Computing Essentials',
        category: 'Workshop',
        date: 'Nov 18, 2026',
        time: '09:00 AM - 12:00 PM',
        venue: 'Lab 1, CSE Block',
        organizer: 'Cloud Tech Club',
        description: 'Hands-on workshop on AWS core services including EC2, S3, Lambda, and IAM.',
        guestSpeaker: 'John Doe, AWS Certified Architect',
        seatLimit: 50,
        registeredCount: 25,
        image: 'linear-gradient(135deg, #F59E0B, #10B981)'
    }
];

export const getEventById = (id) => eventsData.find(e => e.id === id);
