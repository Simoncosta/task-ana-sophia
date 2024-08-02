import { FormEvent, useState } from "react"
import { FaTrashAlt } from "react-icons/fa";

import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [task, setTask] = useState('');

  // array
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSave = (e: FormEvent) => {
    // não faz refresh não página ao submeter o formulário
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask('');
  }

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente excluir?")) {
      // filtro das tasks retornando tudo de menos o que clicamos
      const aux = tasks.filter((result, index) => index !== id);
      setTasks(aux);
      toast.success('Excluído com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.warn('Não excluído!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="p-8">
      <ToastContainer />
      <form onSubmit={handleSave} className="flex items-center space-x-2">
        <input
          className="border-2 border-gray-700 rounded-md h-10 w-full px-4"
          placeholder="Digite sua tarefa"
          type={'text'}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold"
          type="submit"
        >
          Enviar
        </button>
      </form>
      <h3 className="w-full mt-4 uppercase font-bold text-lg">
        Total de tarefas: {tasks.length}
      </h3>
      {
        tasks.map((result, index) => (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type={'checkbox'}
                className="w-6 h-6"
              />
              <span className="text-gray-700 text-lg">{index} {'=>'} {result}</span>
            </div>
            <button
              className="bg-red-500 px-4 py-2 text-white font-semibold rounded-md"
              type={'button'}
              onClick={() => handleDelete(index)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))
      }

    </div>
  )
}

export default App
