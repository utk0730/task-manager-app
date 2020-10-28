import Head from 'next/head'
import { useEffect } from 'react'
import axios from 'axios'
import Layout from './components/common/Layout'
import ActionController from './components/Homepage/ActionController'
import TaskList from './components/Homepage/TaskList'

import { useTasksState, useDispatchTasks } from '../contexts/TasksContext'
interface stateSchema {
  tasks: any[]
  loading: boolean
  users: any[]
  error: any
  selectedTask: string
  selectedPriority: { label: string; value: string }
  startDate: any
  endDate: any
}

export default function Home() {
  const state = useTasksState() as stateSchema
  const dispatch = useDispatchTasks()

  const { tasks, loading, selectedTask, selectedPriority, startDate, endDate } = state

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
          <ActionController />
          <TaskList
            tasks={tasks}
            loading={loading}
            selectedTask={selectedTask}
            selectedPriority={selectedPriority}
            startDate={startDate}
            endDate={endDate}
          />
        </>
      </div>
    </Layout>
  )
}
