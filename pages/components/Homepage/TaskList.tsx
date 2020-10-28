import styled from 'styled-components'
import axios from 'axios'
import { useDispatchTasks } from '../../../contexts/TasksContext'
import Loading from '../common/Loading'
interface TaskSchema {
  id: string
  message: string
  assigned_to: string
  assigned_name: string
  created_on: string
  due_date: string
  priority: string
}
interface TaskListSchema {
  tasks: TaskSchema[]
  loading: boolean
  selectedTask: string
  selectedPriority: { label: string; value: string }
  startDate: any
  endDate: any
}

export default function TaskList({
  tasks,
  loading,
  selectedTask,
  selectedPriority,
  startDate,
  endDate,
}: TaskListSchema) {
  const dispatch = useDispatchTasks()
  const handleTaskDelete = async (id: string) => {
    //@ts-ignore
    dispatch({
      type: 'SET_SELECTED_TASK',
      payload: id,
    })
    //@ts-ignore
    dispatch({
      type: 'DELETE_TASK_REQUEST',
    })
    try {
      const _result = await axios.post(`/api/deleteTask?taskId=${id}`)
      const {
        data: { status },
      } = _result
      if (status == 'success') {
        const _restTasks = tasks.filter((_o) => _o.id != id)
        //@ts-ignore
        dispatch({
          type: 'DELETE_TASK_SUCCESS',
          payload: _restTasks,
        })
      }
    } catch (error) {
      console.log('delete task failed')
      //@ts-ignore
      dispatch({
        type: 'DELETE_TASK_FAILS',
        payload: 'delete task failed',
      })
    }
  }
  let _visibleTasks = tasks
  debugger
  if (selectedPriority) {
    _visibleTasks = tasks.filter((_o) => _o.priority == selectedPriority.value)
  }

  return (
    <TasksContainer>
      {
        loading && !_visibleTasks?.length ? (
          <Loading />
        ) : !_visibleTasks?.length ? (
          <p style={{ textAlign: 'center' }}>No data</p>
        ) : (
          tasks?.map((task) => {
            const { id, message, assigned_name, created_on, due_date, priority } = task
            return (
              <div className="card" key={id}>
                <div>
                  <p>Description : {message} </p>
                  <p>Assgined To : {assigned_name}</p>
                  <p>Create Date : {new Date(created_on).toLocaleDateString()}</p>
                  <p>Due Date : {new Date(due_date).toLocaleDateString()}</p>
                  <p>Priority : {priority}</p>
                </div>
                <div>
                  <button disabled={loading}>Update</button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      handleTaskDelete(id)
                    }}
                  >
                    {loading && selectedTask == id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )
          })
        )

        // })
      }
    </TasksContainer>
  )
}

const TasksContainer = styled.div`
  margin: 4rem 0rem;
  & > div.card {
    padding: 0 3rem;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    & > div:first-child {
      padding: 1rem 0rem;
    }
    & > div:nth-child(2) {
      padding: 1rem 0rem;
      & > button {
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        border: none;
        outline: none;
        padding: 0 15px;
        border-radius: 4px;
        height: 30px;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
`
