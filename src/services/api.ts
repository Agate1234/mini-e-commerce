const BASE_URL = import.meta.env.VITE_API_BASE_URL

class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`)

  if (!response.ok) {
    throw new ApiError(`Request gagal: ${response.status} ${response.statusText}`, response.status)
  }

  return (await response.json()) as T
}

export default { get }
export { ApiError }
