import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export interface Track {
  id: number
  title: string
  description: string
  is_active: boolean
  year: number
  created_at: string
}

const getAvailableTracks = async () => {
  const response = (await axios.get("/tracks")) as Track[]
  return response
}

export const useTracks = () => {
  return useQuery({
    queryKey: ["tracks"],
    queryFn: () => getAvailableTracks(),
  })
}