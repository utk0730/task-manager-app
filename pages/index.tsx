import Head from 'next/head'
import { useEffect } from 'react'
// import axios from "axios"


export default function Home() {
//   const [users, setUsers] = useState([])
//   const [tasks,setTasks] =useState([])

//   const getUserList = async () => {
//     const _result = await axios.get('/api/fetchUsers')
//     const { data: { status, users } } = _result 
//     if (status == "success") {
//       setUsers(users)
//     }
//   }


//   const getTaskList = async () => {
//     const _result = await axios.get('/api/fetchTasks')
//     console.log('_result task list',_result)
//     const { data: { status, tasks } } = _result 
//     if (status == "success") {
//       setTasks(tasks)
//     }
//   }

//   const createTask = async () => {
//     const _result = await axios.post('/api/createTask', {
//       message : 'Task 1',
//       due_date : '2020-09-18 12:12:12',
//       priority: '1',
//       assigned_to:'1'
//     })
//     console.log('create task result...',_result)
//   }

//   const deleteTask = async () => {
//     const id = 575;
//     const _result = await axios.post(`/api/deleteTask?taskId=${id}`);
//     console.log('create task result...', _result);
//   }

//   const updateTask = async () => {
//     const _result = await axios.post('/api/updateTask', {
//       message : 'Updated task',
//       taskid:576,
//     })
//     console.log('update task result...',_result)
//   }

  useEffect(() => {
    // getTaskList()
    // getUserList()
    // createTask()
    // deleteTask()
    // updateTask()
  },[])
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <p>hello sire</p>
      <p>{JSON.stringify([])}</p>
    </div>
  )
}
