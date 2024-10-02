import './App.css'
import { Message } from './components/message';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; 
import { Workflow } from './components/workflow/workflow';


function App() {

  return (
    <>
      <div className='h-screen p-12 grid grid-cols-5 grid-rows-5 gap-12'>
        <div className='bg-dot col-span-1 row-span-1 w-full h-full border rounded-xl p-4 flex flex-col items-center justify-center'>
          <Message></Message>
        </div>
        <div className="h-full bg-dot col-start-3 col-span-2  row-span-3 row-span-4 w-full border rounded-xl flex flex-col items-center justify-center">
          <Workflow></Workflow>
        </div>
      </div>
    </>
  )
}

export default App
