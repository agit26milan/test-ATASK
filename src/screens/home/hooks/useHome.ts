import React from "react"
import axiosInstance from "@/utils/axiosInstance"
import { GITHUB_REPO_API, GITHUB_USER_API } from "@/api/api"
import { isAxiosError } from "axios"
import { UserItems, UserListResponse } from "../interfaces/response"
import { setLoading } from "@/utils/loading"
const useHomeHooks = () => {
    const [listUser, setListUser] = React.useState<UserItems[]>([])
    const [username, setUserName] = React.useState<string>("")

    const fetchListRepo = async (username:string) => {
        const url = `${GITHUB_USER_API}`
        try {
            setLoading(true)
            const users = await axiosInstance<UserListResponse>({method: 'GET', url, params: {q: username}})
            setListUser(users.data.items || [])
            setLoading(false)

        }catch(error) {
            if(isAxiosError(error)) {
                console.log(error)
            }
        }

    }

    const handleExpandedItem = (username:string) => {
        const mapExpand = listUser?.map((data) => {
            if(data?.login === username) {
                return {...data, isExpanded: !data.isExpanded}
            }
            return {...data}
        })
        setListUser(mapExpand)
    }

    const onSelectUsername = async (username:string) => {
        const url = GITHUB_REPO_API.replace(":username", username);
        try {
            const findDataRepo = listUser?.find((data) => data?.login === username);
            if(findDataRepo) {
                if(!findDataRepo.repo) {
                    setLoading(true)
                    try {
                    const listRepo = await axiosInstance({method: 'GET', url})
                    const mappingRepo = listUser?.map((data) => {
                        if(data?.login === username) {
                            return {...data, repo: listRepo.data, isExpanded: !data.isExpanded}
                        }
                        return {...data}
                    })
                    setListUser(mappingRepo)
                    setLoading(false)
                    }catch(e) {
                        setLoading(false)
                        if(isAxiosError(e)) {
                            console.log(e, 'erroe')
                        }
                    }
                } else {
                    handleExpandedItem(username)
                }
            }
         
        }catch(error) {
            if(isAxiosError(error)) {
                console.log({error}, 'error')
            }
        }
    }

    return {
        listUser,
        fetchListRepo,
        setUserName,
        username,
        onSelectUsername
    }
}


export default useHomeHooks