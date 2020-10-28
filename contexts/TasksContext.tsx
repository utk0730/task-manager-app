import { useReducer, createContext, useContext } from 'react'
import { tasksReducer } from './tasksReducer'
import {stateSchema} from "./tasksReducer"

const intialState: stateSchema = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  users: [],
  selectedPriority: null,
  startDate: null,
  endDate: null,
  deleting: false,
  deleteError:'',
  creating: false,
  createError:'',
  updating: false,
  updateError:''
}
const TasksStateContext = createContext({})
const TasksDispatchContext = createContext({})

export const TasksProvider = (props: any) => {
  let [state, dispatch] = useReducer(tasksReducer, intialState)
  return (
    <TasksDispatchContext.Provider value={dispatch}>
      <TasksStateContext.Provider value={state}>{props.children}</TasksStateContext.Provider>
    </TasksDispatchContext.Provider>
  )
}

export const useTasksState = () => useContext(TasksStateContext)
export const useDispatchTasks = () => useContext(TasksDispatchContext)
