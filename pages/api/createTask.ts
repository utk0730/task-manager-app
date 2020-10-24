import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
var FormData = require('form-data');
const _formData = new FormData()
const createTask = async ( req:NextApiRequest,
    res:NextApiResponse) => {
    const _data = req.body || {}
    Object.keys(_data).map(key => {
        _formData.append(key,_data[key])
    })
    try {
      
        var config: AxiosRequestConfig = {
            method: 'post',
            url: 'https://devza.com/tests/tasks/create',
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
    res.status(500).end("Unable to create tasks at this time");
  }
};
export default createTask;