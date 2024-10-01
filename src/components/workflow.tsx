import { useEffect, useRef, useState } from "react"


export const Workflow:React.FC = () => {
    const [position,setPosition] = useState<{x:number,y:number}[]>([{x:0,y:0},{x:0,y:80}]);
    const [relativePositon,setRelativePosition] = useState<{x:number,y:number}>({x:0,y:0});
    const [isDraggingOffset,setIsDraggingOffset] = useState<{isDragging:boolean,index?:number,x:number,y:number}>({isDragging:false,index:undefined,x:0,y:0});

    const relativeDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateRelativePosition = () => {
            const Rect:DOMRect|undefined = relativeDivRef.current?.getBoundingClientRect();
            if(Rect){
                setRelativePosition({x:Rect.x,y:Rect.y});
            }
        }

        window.addEventListener('resize',updateRelativePosition)


        return () => {
            window.removeEventListener('resize',updateRelativePosition);
        }
    });

    useEffect(() => {
        const updateSetIsDraggingOffset = () => setIsDraggingOffset((value) => ({...value,index:undefined,isDragging:false}))
        window.addEventListener('mouseup',updateSetIsDraggingOffset);

        return () => {
            window.removeEventListener('mouseup',updateSetIsDraggingOffset);
        }
    });

    useEffect(() => {
        const Rect:DOMRect|undefined = relativeDivRef.current?.getBoundingClientRect();
        if(Rect){
            setRelativePosition({x:Rect.x,y:Rect.y});
        }
    },[]);

    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>,index:number):void => {
        setIsDraggingOffset({
            isDragging:true,
            x:e.clientX,
            y:e.clientY,
            index,
        });
    }

    const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>):void => {
        if(!isDraggingOffset.isDragging){
            return;
        };
        const draggingEl:DOMRect = e.currentTarget.getBoundingClientRect();
        setPosition((value) => {
            if(isDraggingOffset.index !== undefined){
                value[isDraggingOffset.index] = {
                    x:draggingEl.x - relativePositon.x + e.clientX - isDraggingOffset.x,
                    y:draggingEl.y - relativePositon.y + e.clientY - isDraggingOffset.y
                };
            }
            return value;
        });
        setIsDraggingOffset({...isDraggingOffset,x:e.clientX,y:e.clientY});
    }
    
    return(
        <>
            <div ref={relativeDivRef} className='h-full w-full flex flex-col items-center justify-center gap-4'>
                {
                    position.map((item,index) => {
                        return (
                            <div className="relative h-full w-full" key={index}>
                                <div
                                    className="absolute border min-h-20 min-w-32 bg-white rounded-xl"
                                    style={
                                        {
                                            top:item.y + 'px',
                                            left:item.x + 'px'
                                        }
                                    }
                                    onMouseDown={(e) => handleMouseDown(e,index)}
                                    onMouseMove={handleMouseMove}
                                >
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}