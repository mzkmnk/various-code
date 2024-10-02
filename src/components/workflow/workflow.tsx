import { useWorkflow } from "./useWorkflow"
import { WorkflowItem } from "./workflowItem";


export const Workflow:React.FC = () => {
    const {workflowItems,relativeDivRef,handleMouseDown,handleMouseMove} = useWorkflow();
    return(
        <>
            <div ref={relativeDivRef} className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <div className="relative h-full w-full">
                {
                    workflowItems.map((item,index) => (
                        <WorkflowItem
                            key={index}
                            index={index}
                            item={item}
                            handleMouseDown={handleMouseDown}
                            handleMouseMove={handleMouseMove}
                        ></WorkflowItem>
                    ))
                }
                </div>
            </div>
        </>
    )
}