import { useReducer, createContext, useContext } from 'react'
import { tasksReducer } from './tasksReducer'

interface stateSchema {
  tasks: any[]
  selectedTask: any
  loading: boolean
  error: any
  users: any[]
  selectedPriority: string
  startDate: any
  endDate: any
}

const intialState: stateSchema = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  users: [],
  selectedPriority: '',
  startDate: null,
  endDate: null,
}
const TasksStateContext = createContext({})
const TasksDispatchContext = createContext({})

export const TasksProvider = (props: any) => {
  let [state, dispatch] = useReducer(tasksReducer, intialState)

  //   const updateTask = async () => {
  //     const _result = await axios.post('/api/updateTask', {
  //       message: 'Updated task',
  //       taskid: 576,
  //     })
  //     console.log('update task result...', _result)
  //   }

  return (
    <TasksDispatchContext.Provider value={dispatch}>
      <TasksStateContext.Provider value={state}>{props.children}</TasksStateContext.Provider>
    </TasksDispatchContext.Provider>
  )
}

export const useTasksState = () => useContext(TasksStateContext)
export const useDispatchTasks = () => useContext(TasksDispatchContext)
