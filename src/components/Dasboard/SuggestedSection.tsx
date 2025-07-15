import RetentionByCohortChart from '../Chart/RetentionByCohortChart';
import UserRetentionChart from '../Chart/UserRetentionChart';
import NewUsersByChannelChart from '../Chart/NewUsersByChannelChart';
import EventCountChart from '../Chart/EventCountChart';
import UserActivityChart from '../Chart/UserActivityChart';
import ActiveUsersByCountryChart from '../Chart/ActiveUsersByCountryChart';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';

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
        <div className="mt-6 w-[96%]">
            <Slider {...settings}>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <RetentionByCohortChart />
                </div>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <UserRetentionChart />
                </div>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <NewUsersByChannelChart />
                </div>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <EventCountChart />
                </div>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <UserActivityChart />
                </div>
                <div className="p-4 min-w-0 overflow-hidden h-[400px]">
                    <ActiveUsersByCountryChart />
                </div>
            </Slider >
        </div >
    );
}