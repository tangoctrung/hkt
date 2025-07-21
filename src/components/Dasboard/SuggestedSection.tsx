import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import UserRetentionChart from './Components/UserRetentionChart';
import NewUsersByChannelChart from './Components/NewUsersByChannelChart';
import UserActivityChart from './Components/UserActivityChart';

export default function SuggestedSection({
    data,
    distanceDate
}: {
    data: any;
    distanceDate: number;
}) {
    const [ready, setReady] = useState(false);
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
        ],
    };

    useEffect(() => {
        const frame = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    if (!ready) return null;
    console.log("distanceDate", data?.userRetention?.length, distanceDate);

    return (
        <div className="w-full overflow-hidden">
            <Slider {...settings} className='w-full'>
                <div className="w-full shadow-md overflow-hidden h-[440px]">
                    <UserRetentionChart data={data?.userRetention} />
                </div>
                <div className="w-full shadow-md overflow-hidden h-[440px]">
                    <NewUsersByChannelChart data={data?.newUsersByChannel || []} />
                </div>
                <div className="w-full shadow-md overflow-hidden h-[440px]">
                    <UserActivityChart data={data?.userActivityOverTime} />
                </div>
            </Slider >
        </div >
    );
}
