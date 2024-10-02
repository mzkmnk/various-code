import { useEffect, useRef, useState } from "react"


export const Workflow:React.FC = () => {
    const [workflowItems,setWorkflowItems] = useState<{x:number,y:number,z:number}[]>([
        {x:0,y:0,z:0},
        {x:0,y:30,z:1},
        {x:0,y:50,z:2}
    ]);
    const [relativePositon,setRelativePosition] = useState<{x:number,y:number}>({x:0,y:0});
    const [draggingOffset,setDraggingOffset] = useState<{isDragging:boolean,index?:number,x:number,y:number}>({isDragging:false,index:undefined,x:0,y:0});

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
        const updateSetIsDraggingOffset = () => setDraggingOffset((value) => ({...value,index:undefined,isDragging:false}))
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
        setDraggingOffset({
            isDragging:true,
            x:e.clientX,
            y:e.clientY,
            index,
        });

        setWorkflowItems((workflowItems) => {
            workflowItems.map((workflowItem) => {
                if(workflowItems[index].z < workflowItem.z){
                    workflowItem.z -= 1;
                }
            })
            workflowItems[index].z = workflowItems.length - 1;
            return workflowItems;
        })
    }
    const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>):void => {
        if(!draggingOffset.isDragging){
            return;
        };
        const draggingEl:DOMRect = e.currentTarget.getBoundingClientRect();
        setWorkflowItems((value) => {
            if(draggingOffset.index !== undefined){
                value[draggingOffset.index] = {
                    ...value[draggingOffset.index],
                    x:draggingEl.x - relativePositon.x + e.clientX - draggingOffset.x,
                    y:draggingEl.y - relativePositon.y + e.clientY - draggingOffset.y,
                };
            }
            return value;
        });
        setDraggingOffset({...draggingOffset,x:e.clientX,y:e.clientY});
    }
    
    return(
        <>
            <div ref={relativeDivRef} className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <div className="relative h-full w-full">
                {
                    workflowItems.map((item,index) => {
                        return (
                            <div
                                key={index}
                                className="absolute flex flex-col items-center justify-center"
                                style={{
                                    top:item.y + 'px',
                                    left:item.x + 'px',
                                    zIndex:item.z,
                                    
                                }}
                                onMouseDown={(e) => handleMouseDown(e,index)}
                                onMouseMove={handleMouseMove}
                            >
                                <div className="border rounded-xl min-h-20 min-w-32 bg-white">
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </>
    )
}