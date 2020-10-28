import React, { useEffect } from 'react'
import styled from 'styled-components'
import Input from '../common/Input'
import Select from '../common/Select'
import CustomDatePicker from '../common/DatePicker'
import { Form, Field } from 'react-final-form'
import { pickBy, identity } from 'lodash'
import axios, { AxiosRequestConfig } from 'axios'
import { useDispatchTasks, useTasksState } from '../../../contexts/TasksContext'
import { _priorityDropdownOptions } from '../../../constants'
import { isEmpty } from 'lodash'

interface stateSchema {
  tasks: any[]
  loading: boolean
  selected: any
  users: any[]
  error: any
  selectedTask: string
}

interface FormSchema {
  setShowModal: any
}

export default function CreateTaskForm({ setShowModal }: FormSchema) {
  const dispatch = useDispatchTasks()
  const state = useTasksState() as stateSchema

  const { loading, users, error } = state
  
  console.log('state',state)
  const getUserList = async () => {
    //@ts-ignore
    dispatch({
      type: 'FETCH_USERS_REQUEST',
    })
    try {
      const _result = await axios.get('/api/fetchUsers')
      const {
        data: { status, users },
      } = _result
      if (status == 'success') {
        //@ts-ignore
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          payload: users,
        })
      }
    } catch (error) {
      //@ts-ignore
      dispatch({
        type: 'FETCH_USERS_FAILS',
        payload: 'fetch users failed',
      })
    }
  }
  useEffect(() => {
    getUserList()
  }, [])
  const onSubmit = async (values: any) => {
    //@ts-ignore
    dispatch({
      type: 'CREATE_TASK_REQUEST',
      loading:true,
    })
    const _values = pickBy(values, identity)
    const { due_date } = _values
    const created_on = new Date()
    if (due_date) {
      _values.due_date = new Date(due_date).getTime()
    }
    try {
      const _result: AxiosRequestConfig = await axios.post('/api/createTask', _values)
      const {
        data: { status, taskid },
      } = _result
      if (status == 'success') {
        //@ts-ignore
        // dispatch({
        //   type: 'SET_SELECTED_TASK',
        //   payload: taskid,
        // })
        _values.id = taskid
        _values.created_on = new Date().getTime()
        //@ts-ignore
        dispatch({
          type: 'CREATE_TASK_SUCCESS',
          payload: { ..._values, due_date, created_on },
        })
        setShowModal(false)
      }
    } catch (error) {
      console.log('err craete task')
      //@ts-ignore
      dispatch({
        type: 'CREATE_TASK_FAILS',
        error: 'err craete task',
      })
    }
  }
  const isoDate = (date: Date) => {
    let _d = date && new Date(date.getTime() - date.getTimezoneOffset() * 60000).getTime()
    return _d
  }

  const _users = users?.map((_o) => {
    let _obj = {} as {
      label: string
      value: string
    }
    const { id, name } = _o
    ;(_obj.label = name), (_obj.value = id)
    return _obj
  })
  const initValues = {
    due_date: new Date(),
    assigned_to: _users[0]?.value,
    priority: _priorityDropdownOptions[0]?.value,
    message: '',
  }

  debugger
  return (
    <MainContainer>
      <p>Create Task</p>
      <Form
        initialValues={initValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <FormWrapper>
              <FormFieldWrapper>
                <label>Task description</label>
                <Field
                  name="message"
                  component={Input}
                  type="text"
                  placeholder="Enter task description"
                />
              </FormFieldWrapper>

              <FormFieldWrapper>
                <label>Assign To</label>
                <Field name="assigned_to" component={Select} options={_users}/>
              </FormFieldWrapper>
              <FormFieldWrapper>
                <label>Due date</label>
                <Field
                  name="due_date"
                  component={CustomDatePicker}
                  type="text"
                  placeholder="Select due date"
                  minDate={new Date()}
                  format={(value) => isoDate(value)}
                />
              </FormFieldWrapper>
              <FormFieldWrapper>
                <label>Select Task Priority</label>
                <Field name="priority" component={Select} options={_priorityDropdownOptions} />
              </FormFieldWrapper>
              {error && <p className="error-msg">{error}</p>}
              <div className="btnWrapper">
                <button type="submit" disabled={!isEmpty(errors) || loading} onClick={onSubmit}>
                  Create Task
                </button>
              </div>
            </FormWrapper>
          </form>
        )}
      />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 100%;
  & > p {
    text-align: center;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    color: ${({ theme }) => theme.colors.textcolorlight};
  }
`

const FormWrapper = styled.div`
  & .btnWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    & > button {
      padding: 1.2rem 2rem;
      outline: none;
      border: none;
      border-radius: 4px;
      font-weight: bold;
      margin-top: 1.5rem;
      cursor: pointer;
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
    @media (max-width: 767px) {
      width: 100%;
      justify-content: center;
    }
  }
  & .error-msg{
    color:red;
    padding:10px 0px;
  }
`

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  padding: 0.5rem 0rem;
  & > label {
    padding-bottom: 0.5rem;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`
