export interface stateSchema {
  tasks: any[]
  selectedTask: any
  selectedPriority: { value: string; label: string } | null
  startDate: any
  endDate: any
  loading: boolean
  deleting: boolean
  deleteError:string
  creating: boolean
  createError:string
  updating: boolean
  updateError:string
  error: any
  users: any[]
}
interface actionSchema {
  type: string
  payload?: any
}
export const tasksReducer = (state: stateSchema, action: actionSchema) => {
  const { payload, type } = action
  console.log('action ', action)
  switch (type) {
    case 'FETCH_TASKS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        loading: false,
        tasks: payload,
      }
    case 'FETCH_TASKS_FAIL':
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case 'FILTER_TASKS':
      return {
        ...state,
        tasks: payload,
      }
    case 'SET_SELECTEDTASK':
      return {
        ...state,
        selectedTask: payload,
      }
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        loading: true,
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: payload,
      }
    case 'FETCH_USERS_FAILS':
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case 'CREATE_TASK_REQUEST':
      return {
        ...state,
          createError:'',
         creating: true,
      }
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
         creating: false,
        tasks: [...state.tasks, payload],
      }
    case 'CREATE_TASK_FAILS':
      return {
        ...state,
        creating: false,
        createError: payload,
      }
    case 'UPDATE_TASK_REQUEST':
      return {
        ...state,
        updating: true,
      }
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        updating: false,
        tasks: payload,
      }
    case 'UPDATE_TASK_FAILS':
      return {
        ...state,
        updating: false,
        error: payload,
      }
    case 'DELETE_TASK_REQUEST':
      return {
        ...state,
        deleting: true,
        deleteError:''
      }
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        deleting: false,
        tasks: payload
      }
    case 'DELETE_TASK_FAILS':
      return {
        ...state,
        deleting: false,
        deleteError: payload,
      }
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: payload,
      }
    case 'SET_PRIORITY':
      return {
        ...state,
        selectedPriority: payload,
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: payload,
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: payload,
      }

    default:
      throw new Error(`Unknown action: ${type}`)
  }
}
