import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const fetchUsers = async ( _req:NextApiRequest,
  res:NextApiResponse) => {
  try {
    const config:AxiosRequestConfig = {
      method: "get",
      url: "https://devza.com/tests/tasks/listusers",
      headers: {
        AuthToken: process.env.API_TOKEN,
      },
    };
    return await axios(config)
      .then((response) => {

        res.send(response.data);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).end("Unable to fetch user list at this time");
  }
};
export default fetchUsers;
