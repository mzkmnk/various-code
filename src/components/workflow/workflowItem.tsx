export type WorkflowItemProps = {
    index:number,
    item:{x:number,y:number,z:number},
    handleMouseDown:(e:React.MouseEvent<HTMLDivElement>,index:number) => void,
    handleMouseMove:(e:React.MouseEvent<HTMLDivElement>) => void,
}

export const WorkflowItem:React.FC<WorkflowItemProps> = (
    {
        index,
        item,
        handleMouseDown,
        handleMouseMove
    }
) => {
    return (
        <div
            key={index}
            className="absolute flex flex-col items-center justify-center"
            style={{
                top:item.y + 'px',
                left:item.x + 'px',
                zIndex:item.z,
                
            }}
        >
            <svg width="10" height="10" className="fill-slate-800">
                <circle cx="5" cy="5" r="2.5" stroke="black"></circle>
            </svg>
            <div
            className="border rounded-xl min-h-20 min-w-32 bg-white"
            onMouseDown={(e) => handleMouseDown(e,index)}
            onMouseMove={handleMouseMove}
            >
            </div>
            <svg width="10" height="10" className="fill-slate-800">
                <circle cx="5" cy="5" r="2.5" stroke="black"></circle>
            </svg>
        </div>
    )
}