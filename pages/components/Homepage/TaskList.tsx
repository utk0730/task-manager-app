import { useEffect, useState,SetStateAction } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatchTasks } from '../../../contexts/TasksContext'
import Loading from '../common/Loading'
import { useToasts } from 'react-toast-notifications'
import UpdateTaskForm from '../Homepage/EditTaskForm'
import CustomModal from '../common/CustomModal'
import { stateSchema } from "../../../contexts/tasksReducer"


type Props = stateSchema & {
  showUpdateTaskForm: boolean
  setShowUpdateTaskForm: React.Dispatch<SetStateAction<boolean>>
}

export default function TaskList({
  tasks,
  loading,
  selectedTask,
  selectedPriority,
  startDate,
  endDate,
  deleting,
  updating,
  showUpdateTaskForm,
  setShowUpdateTaskForm,
}: Props) {
  const [_visibleTasks, seVisibleTasks] = useState(tasks)

  useEffect(() => {
    seVisibleTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if (startDate) {
      let _vTasks = tasks.filter((_o) => {
        let _due = _o.due_date?.split(' ')[0]
        let _d = new Date(startDate)
          .toLocaleString()
          .replace(/\//g, '-')
          .replace(/\,/g, '')
          .split(' ')
        let _formatSD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
        let _sDate = _formatSD.split(' ')[0]
        return new Date(_due).getTime() >= new Date(_sDate).getTime()
      })
      seVisibleTasks(_vTasks)
    }
    if (endDate) {
      let _vTasks = _visibleTasks.filter((_o) => {
        let _due = _o.due_date?.split(' ')[0]
        let _d = new Date(endDate)
          .toLocaleString()
          .replace(/\//g, '-')
          .replace(/\,/g, '')
          .split(' ')
        let _formatSD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
        let _sDate = _formatSD.split(' ')[0]
        return new Date(_due).getTime() <= new Date(_sDate).getTime()
      })
      seVisibleTasks(_vTasks)
    }
    if (!startDate && !endDate) {
      seVisibleTasks(tasks)
    }
  }, [startDate, endDate])

  let _filterTasks
  if (selectedPriority) {
    _filterTasks = _visibleTasks.filter((_o) => _o.priority == selectedPriority.value)
  } else {
    _filterTasks = _visibleTasks
  }
  const { addToast } = useToasts()
  const dispatch = useDispatchTasks()

  const handleTaskUpdate = async (id: string) => {
    //@ts-ignore
    dispatch({
      type: 'SET_SELECTED_TASK',
      payload: id,
    })
  }

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
        data: { status, error },
      } = _result
      if (status == 'success') {
        const _restTasks = tasks.filter((_o) => _o.id != id)
        //@ts-ignore
        dispatch({
          type: 'DELETE_TASK_SUCCESS',
          payload: _restTasks,
        })
        addToast('Successfully deleted task', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else {
        //@ts-ignore
        dispatch({
          type: 'DELETE_TASK_FAILS',
          payload: error,
        })
        addToast('Error deleting task. please try again after some time', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } catch (error) {
      //@ts-ignore
      dispatch({
        type: 'DELETE_TASK_FAILS',
        payload: 'Error deleting task. please try again after some time',
      })
      addToast('Error deleting task. please try again after some time', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  console.log('tasks...', tasks)
  console.log('visi', _filterTasks)
  return (
    <TasksContainer>
      {
        loading && !_filterTasks?.length ? (
          <Loading />
        ) : !_filterTasks?.length ? (
          <div style={{ textAlign: 'center' }}>
            <p>No Tasks in TaskBoard</p>
          </div>
        ) : (
          _filterTasks?.map((task) => {
            const { id, message, assigned_name, due_date, priority } = task
            return (
              <div className="card" key={id}>
                <div className="details">
                  <div>
                    <p>
                      Description : <span>{message} </span>
                    </p>
                    <p>
                      Assigned To : <span>{assigned_name}</span>
                    </p>
                    <p>
                      Due Date : <span>{new Date(due_date).toLocaleDateString()}</span>{' '}
                    </p>
                  </div>
                  {/* @ts-ignore */}
                  <div className="p-order">
                    Priority : <StyledCircle pnum={priority}>{parseInt(priority)}</StyledCircle>
                  </div>
                </div>

                <div className="actions">
                  <button
                    disabled={updating}
                    onClick={() => {
                      setShowUpdateTaskForm(true)
                      handleTaskUpdate(id)
                    }}
                  >
                    Update
                  </button>
                  <button
                    disabled={deleting}
                    onClick={() => {
                      handleTaskDelete(id)
                    }}
                  >
                    {deleting && selectedTask == id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )
          })
        )

        // })
      }
      {showUpdateTaskForm && (
        <CustomModal isOpen={showUpdateTaskForm} setShowModal={setShowUpdateTaskForm}>
          <UpdateTaskForm setShowModal={setShowUpdateTaskForm} />
        </CustomModal>
      )}
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
    box-shadow: 0px 10px 10px #00000017;
    @media (max-width: 767px) {
      padding: 0 10px;
      flex-direction: column;
      align-items: center;
    }
    & > div.details {
      padding: 1rem 0rem;
      min-width: 40%;
      max-width: 80%;
      display: flex;
      justify-content: space-between;
      @media (max-width: 767px) {
        min-width: 100%;
      }
      & > div.p-order {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: ${({ theme }) => theme.fontSize.md};
        color: ${({ theme }) => theme.colors.textcolorlight};
        font-weight: 600;
        padding: 3px 0px;
        & > span {
          font-weight: bold;
        }
      }
    }
    & > div.actions {
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
  .error-msg {
    color: red;
  }
`

const StyledCircle = styled.div<{ pnum: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) =>
    props.pnum == 1 ? '5px solid red' : props.pnum == 2 ? '5px solid orange' : '5px solid green'};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  margin-left: 5px; ;
`
