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
import { useToasts } from 'react-toast-notifications'
import {stateSchema} from "../../../contexts/tasksReducer"

interface FormSchema {
  setShowModal: any
}

export default function CreateTaskForm({ setShowModal }: FormSchema) {
  const { addToast } = useToasts()
  const dispatch = useDispatchTasks()
  const state = useTasksState() as stateSchema

  const { creating, createError, users } = state
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
      addToast('fetch users failed', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  useEffect(() => {
    getUserList()
  }, [])
  const onSubmit = async (values: any) => {
    const _values = pickBy(values, identity)
    const { due_date } = _values
    if (due_date) {
      let _d = new Date(due_date).toLocaleString().replace(/\//g, '-').replace(/\,/g, '').split(' ')
      let _formatD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
      _values.due_date = _formatD
    }
    //@ts-ignore
    dispatch({
      type: 'CREATE_TASK_REQUEST',
    })
    try {
      const _result: AxiosRequestConfig = await axios.post('/api/createTask', _values)
      const {
        data: { status, error, taskid },
      } = _result
      if (status == 'success') {
        _values.id = taskid
        let _d = new Date().toLocaleString().replace(/\//g, '-').replace(/\,/g, '').split(' ')
        let _formatD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
        _values.created_on = _formatD
        _values.assigned_name = _users?.filter((_o) => _o.value == _values.assigned_to)[0].label
        //@ts-ignore
        dispatch({
          type: 'CREATE_TASK_SUCCESS',
          payload: { ..._values },
        })
        addToast('Successfully created task', {
          appearance: 'success',
          autoDismiss: true,
        })
        setShowModal(false)
      } else {
        //@ts-ignore
        dispatch({
          type: 'CREATE_TASK_FAILS',
          payload: error,
        })
        addToast('Create task fails', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } catch (error) {
      //@ts-ignore
      dispatch({
        type: 'CREATE_TASK_FAILS',
        payload: 'Error creatng new tasks. please try again after some time',
      })
      addToast('Create task fails', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
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

  return (
    <MainContainer>
      <p>Create Task</p>
      <Form
        initialValues={initValues}
        onSubmit={onSubmit}
        render={({ errors, values }) => (
          <form>
            <FormWrapper>
              <FormFieldWrapper>
                <label>Task description</label>
                <Field
                  name="message"
                  component={Input}
                  type="text"
                  placeholder="Enter task description"
                  value={initValues?.message}
                />
              </FormFieldWrapper>

              <FormFieldWrapper>
                <label>Assign To</label>
                <Field name="assigned_to" component={Select} options={_users} />
              </FormFieldWrapper>
              <FormFieldWrapper>
                <label>Due date</label>
                <Field
                  name="due_date"
                  component={CustomDatePicker}
                  type="text"
                  placeholder="Select due date"
                  minDate={new Date()}
                />
              </FormFieldWrapper>
              <FormFieldWrapper>
                <label>Select Task Priority</label>
                <Field name="priority" component={Select} options={_priorityDropdownOptions} />
              </FormFieldWrapper>
              {createError && <p className="error-msg">{createError}</p>}
              <div className="btnWrapper">
                <button
                  disabled={!isEmpty(errors) || creating}
                  onClick={(e) => {
                    e.preventDefault()
                    onSubmit(values)
                  }}
                >
                  {creating ? 'Creating...' : 'Create Task'}
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
  & .error-msg {
    color: red;
    padding: 10px 0px;
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
