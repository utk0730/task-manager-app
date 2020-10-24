import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
var FormData = require('form-data');
const _formData = new FormData()
const deleteTask = async ( req:NextApiRequest,
    res:NextApiResponse) => {
    console.log('req query...',req.query)
    const taskId = req.query.taskId
    _formData.append('taskid', taskId);
    try {
      
        var config:AxiosRequestConfig = {
            method: 'post',
            url: 'https://devza.com/tests/tasks/delete',
            headers: { 
                'AuthToken': process.env.API_TOKEN,
                ..._formData.getHeaders()
            },
            data : _formData 
          };
    return await axios(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).end("Unable to delete tasks at this time");
  }
};
export default deleteTask;