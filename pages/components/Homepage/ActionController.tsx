import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomModal from '../common/CustomModal'
import CreateTaskForm from '../Homepage/CreateTaskForm'
import { _priorityDropdownOptions } from '../../../constants'
import { useDispatchTasks, useTasksState } from '../../../contexts/TasksContext'

const customStyles = {
  control: () => ({
    width: '220px',
    display: 'flex',
    border: `1px solid #0D19A3`,
    borderRadius: '4px',
    cursor: 'pointer',
    height: '50px',
  }),
}

export default function ActionController() {
  const dispatch = useDispatchTasks()
  const state = useTasksState()

  //@ts-ignore
  const { tasks, selectedPriority, startDate, endDate } = state
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)
  const handleSortByProrityChange = (e: any) => {
    //@ts-ignore
    dispatch({
      type: 'SET_PRIORITY',
      payload: e,
    })
  }

  return (
    <>
      <ActionsWrapper>
        <div>
          <button onClick={() => setShowCreateTaskForm(!showCreateTaskForm)}>Create Task</button>
          <button>Show all Tasks</button>
        </div>
        <div>
          <StyledSelect
            placeholder="Sort Task by Priority"
            value={selectedPriority}
            onChange={handleSortByProrityChange}
            options={_priorityDropdownOptions}
            styles={customStyles}
          />
          <StyledDatePicker
            selected={null}
            onChange={(value) => {
              console.log(value)
            }}
            showPopperArrow={false}
            showMonthDropdown
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Start Date"
          />
          <StyledDatePicker
            selected={null}
            onChange={(value) => {
              console.log(value)
            }}
            showPopperArrow={false}
            showMonthDropdown
            dateFormat="dd/MM/yyyy"
            placeholderText="Select End Date"
          />
        </div>
      </ActionsWrapper>
      {showCreateTaskForm && (
        <CustomModal isOpen={showCreateTaskForm} setShowModal={setShowCreateTaskForm}>
          <CreateTaskForm setShowModal={setShowCreateTaskForm} />
        </CustomModal>
      )}
    </>
  )
}

const ActionsWrapper = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
  }
  & button {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    outline: none;
    padding: 0 15px;
    border-radius: 4px;
    height: 50px;
    cursor: pointer;
    margin-right: 10px;
  }
`
const StyledSelect = styled(Select)`
  margin-right: 10px;
`

const StyledDatePicker = styled(DatePicker)`
  height: 50px;
  border-radius: 4px;
  padding: 0 15px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  margin-right: 10px;
`
