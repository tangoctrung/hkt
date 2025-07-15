import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import RetentionByCohortChart from './Components/RetentionByCohortChart';
import UserRetentionChart from './Components/UserRetentionChart';
import NewUsersByChannelChart from './Components/NewUsersByChannelChart';
import UserActivityChart from './Components/UserActivityChart';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
};

export default function SuggestedSection() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    if (!ready) return null;

    return (
        <div className="mt-6 w-full overflow-hidden h-full">
            <Slider {...settings} className='w-full'>
                <div className="p-[10px] min-w-0 overflow-hidden h-[420px]">
                    <RetentionByCohortChart />
                </div>
                <div className="p-[10px] min-w-0 overflow-hidden h-[420px]">
                    <UserRetentionChart />
                </div>
                <div className="p-[10px] min-w-0 overflow-hidden h-[420px]">
                    <NewUsersByChannelChart />
                </div>
                <div className="p-[10px] min-w-0 overflow-hidden h-[420px]">
                    <UserActivityChart />
                </div>
            </Slider >
        </div >
    );
}