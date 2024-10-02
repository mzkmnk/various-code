export type TWorkflowItem = {
    x:number,
    y:number,
    z:number,
}

export type TDraggingOffset = Omit<TWorkflowItem,'z'> & {
    isDragging:boolean,
    index?:number,
}