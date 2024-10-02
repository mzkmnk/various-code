import { useEffect, useState } from 'react';
import { interval } from 'rxjs';

export const Message = () => {

    const [isEnd,setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        interval(3000).subscribe(() => {
            setIsEnd(true);
        });
    },[]);

    return(
        <>
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className={['flex flex-col w-full h-full items-center justify-center',isEnd ? 'animate-[x-shape-keyframe_1.5s]':''].join(' ').trim()}>
                    <div
                        className="w-48 flex flex-row justify-center items-center gap-2 border-[1px] rounded-xl px-5 py-2 bg-green-200 border-green-400"
                    >
                        <i className={[isEnd ? 'pi-check':'pi-spin pi-spinner','pi text-green-600'].join(' ').trim()}></i>
                        <p className="font-semibold text-green-600">{isEnd ? 'Completed':'Wating...'}</p>
                    </div>
                </div>
                <h4>Message Component</h4>
            </div>
        </>
    )
}