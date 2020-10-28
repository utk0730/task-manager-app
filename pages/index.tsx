import Head from 'next/head'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Layout from './components/common/Layout'
import ActionController from './components/Homepage/ActionController'
import TaskList from './components/Homepage/TaskList'

import { useTasksState, useDispatchTasks } from '../contexts/TasksContext'
import {stateSchema} from "../contexts/tasksReducer"


export default function Home() {
  const state = useTasksState() as stateSchema
  const dispatch = useDispatchTasks()
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)
  const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false)
  const { tasks, loading, selectedTask, selectedPriority, startDate, endDate,error,deleteError,deleting,updating,updateError } = state

  const getTaskList = async () => {
    //@ts-ignore
    dispatch({
      type: 'FETCH_TASKS_REQUEST',
      payload: true,
    })
    try {
      const _result = await axios.get('/api/fetchTasks')
      const {
        data: { status, tasks },
      } = _result
      if (status == 'success') {
        //@ts-ignore
        dispatch({
          type: 'FETCH_TASKS_SUCCESS',
          payload: tasks,
        })
      }
    } catch (error) {
      //@ts-ignore
      dispatch({
        type: 'FETCH_TASKS_FAILS',
        payload: 'Error fetching tasks',
      })
    }
  }
  useEffect(() => {
    getTaskList()
  }, [])

  return (
    <Layout>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>
          <ActionController
            showCreateTaskForm={showCreateTaskForm}
            setShowCreateTaskForm={setShowCreateTaskForm}
          />
          {/* @ts-ignore */}
          <TaskList
            tasks={tasks}
            loading={loading}
            selectedTask={selectedTask}
            selectedPriority={selectedPriority}
            startDate={startDate}
            endDate={endDate}
            error={error}
            deleteError={deleteError}
            deleting={deleting}
            updating={updating}
            updateError={updateError}
            showUpdateTaskForm={showUpdateTaskForm}
            setShowUpdateTaskForm={setShowUpdateTaskForm}
          />
        </>
      </div>
    </Layout>
  )
}
