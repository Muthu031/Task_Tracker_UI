import axios from 'axios';
import { Task } from './apiTypes';


export const getAllTasks = async (userKey: string): Promise<Task[]> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/list_all_task`, {
      params: {
        user_key: userKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getAllTasksUsingFetch = async (userKey: string): Promise<Task[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/user/list_all_task?user_key=${userKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
