import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

async function get<T>(path: string): Promise<T> {
  const response = await client.get<T>(path)
  return response.data
}

export default { get }
