import React, { useEffect, useState } from 'react'
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

export default function UpdateTaskForm({ setShowModal }: FormSchema) {
  const { addToast } = useToasts()
  const dispatch = useDispatchTasks()
  const state = useTasksState() as stateSchema
  const { updating, updateError, tasks, users, selectedTask } = state

  //@ts-ignore
  const [initialValues, setInitialValues] = useState(() => {
    const _t = tasks.filter((_o) => _o.id == selectedTask)
    if (_t.length) {
      const _nt = { ..._t[0] }
      if (_nt.due_date) {
        _nt.due_date = new Date(_nt.due_date)
      }
      return _nt
    }
  })
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
    const { due_date, created_on } = _values
    if (due_date) {
      let _d = new Date(due_date).toLocaleString().replace(/\//g, '-').replace(/\,/g, '').split(' ')
      let _formatD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
      _values.due_date = _formatD
    }
    if (created_on) {
      let _d = new Date().toLocaleString().replace(/\//g, '-').replace(/\,/g, '').split(' ')
      let _formatD = _d[0].split('-').reverse().join('-') + ' ' + _d[1]
      _values.created_on = _formatD
    }
    _values.taskid = selectedTask
    //@ts-ignore
    dispatch({
      type: 'UPDATE_TASK_REQUEST',
    })
    try {
      const _result: AxiosRequestConfig = await axios.post('/api/updateTask', _values)
      const {
        data: { status, error },
      } = _result
      if (status == 'success') {
        _values.assigned_name = _users?.filter((_o) => _o.value == _values.assigned_to)[0].label

        const _updatedTasks = tasks?.map((_o) => {
          if (_o.id == selectedTask) {
            return _values
          } else {
            return _o
          }
        })
        //@ts-ignore
        dispatch({
          type: 'UPDATE_TASK_SUCCESS',
          payload: _updatedTasks,
        })
        addToast('Successfully updated task', {
          appearance: 'success',
          autoDismiss: true,
        })
        setShowModal(false)
      } else {
        //@ts-ignore
        dispatch({
          type: 'UPDATE_TASK_FAILS',
          payload: error,
        })
        addToast('Update task fails', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    } catch (error) {
      //@ts-ignore
      dispatch({
        type: 'UPDATE_TASK_FAILS',
        payload: 'Error updating tasks. please try again after some time',
      })
      addToast('Update task fails', {
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

  return (
    <MainContainer>
      <p>Update Task</p>
      <Form
        initialValues={initialValues}
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
              {updateError && <p className="error-msg">{updateError}</p>}
              <div className="btnWrapper">
                <button
                  disabled={!isEmpty(errors) || updating}
                  onClick={(e) => {
                    e.preventDefault()
                    onSubmit(values)
                  }}
                >
                  {updating ? 'Updating...' : 'Update Task'}
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
