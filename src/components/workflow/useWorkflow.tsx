import { useEffect, useRef, useState } from "react";
import { TDraggingOffset, TWorkflowItem } from "./workflow.type";

/** ロジック部分 */
export const useWorkflow = ():{
    workflowItems: {x:number,y:number,z:number}[],
    relativeDivRef:React.RefObject<HTMLDivElement>,
    handleMouseDown:(e:React.MouseEvent<HTMLDivElement>,index:number) => void,
    handleMouseMove:(e:React.MouseEvent<HTMLDivElement>) => void
} => {
    const [workflowItems,setWorkflowItems] = useState<TWorkflowItem[]>([
        {x:0,y:0,z:0},
        {x:30,y:200,z:1},
        {x:80,y:100,z:2},
        {x:100,y:300,z:3},
    ]);
    const [relativePositon,setRelativePosition] = useState<Omit<TWorkflowItem,'z'>>({x:0,y:0});
    const [draggingOffset,setDraggingOffset] = useState<TDraggingOffset>({isDragging:false,index:undefined,x:0,y:0});

    const relativeDivRef = useRef<HTMLDivElement>(null);

    /** 画面の大きさを変えたら再度計算する */
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

    /** マウスが離されたらドラッグを止める(mouseup) */
    useEffect(() => {
        const updateSetIsDraggingOffset = () => setDraggingOffset((value) => ({...value,index:undefined,isDragging:false}))
        window.addEventListener('mouseup',updateSetIsDraggingOffset);

        return () => {
            window.removeEventListener('mouseup',updateSetIsDraggingOffset);
        }
    });

    /** relative要素の座標を更新する */
    useEffect(() => {
        const Rect:DOMRect|undefined = relativeDivRef.current?.getBoundingClientRect();
        if(Rect){
            setRelativePosition({x:Rect.x,y:Rect.y});
        }
    },[]);

    /**
     * ドラッグ中の要素を更新する(mousedown)
     * @param e 
     * @param index 
     */
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

    /**
     * ドラッグ中の要素の座標を更新する(mousemove)
     * @param e 
     * @returns 
     */
    const handleMouseMove = (e:React.MouseEvent<HTMLDivElement>):void => {
        const {draggingParentX,draggingParentY} = getParentPosition(e);
        if(!draggingOffset.isDragging || !draggingParentX || !draggingParentY){
            return;
        };

        setWorkflowItems((value) => {
            if(draggingOffset.index !== undefined){
                value[draggingOffset.index] = {
                    ...value[draggingOffset.index],
                    // ドラッグ中の親要素の座標-relative要素の座標 + ドラッグ中の座標値 - ドラッグ開始時の座標値
                    x:draggingParentX - relativePositon.x + e.clientX - draggingOffset.x,
                    y:draggingParentY - relativePositon.y + e.clientY - draggingOffset.y,
                };
            }
            return value;
        });
        setDraggingOffset({...draggingOffset,x:e.clientX,y:e.clientY});
    };

    /**
     * 与えられた要素の親要素の座標を返す
     * @param e 
     * @returns 
     */
    const getParentPosition = (e:React.MouseEvent<HTMLDivElement>):{draggingParentX?:number,draggingParentY?:number} => {
        const parentEl = e.currentTarget.parentElement;
        const parentRect = parentEl?.getBoundingClientRect();
        return {
            draggingParentX:parentRect?.x,
            draggingParentY:parentRect?.y
        };
    }

    return {
        workflowItems,
        relativeDivRef,
        handleMouseDown,
        handleMouseMove
    }
}