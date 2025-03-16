import React from "react"
import axiosInstance from "@/utils/axiosInstance"
import { GITHUB_REPO_API, GITHUB_USER_API } from "@/api/api"
import { isAxiosError } from "axios"
import { UserItems, UserListResponse } from "../interfaces/response"
import { setLoading } from "@/utils/loading"
const useHomeHooks = () => {
    const [listUser, setListUser] = React.useState<UserItems[]>([])
    const [username, setUserName] = React.useState<string>("")
    const [finalUserName, setFinalUsername] = React.useState<string>("")
    const [isFetching, setIsFethcing] = React.useState<boolean>(false)
    const fetchListRepo = async (username:string) => {
        const url = `${GITHUB_USER_API}`
        try {
            setIsFethcing(true)
            setLoading(true)
            const users = await axiosInstance<UserListResponse>({method: 'GET', url, params: {q: username}})
            setListUser(users.data.items || [])
            setLoading(false)
            setIsFethcing(false)

        }catch(error) {
            setIsFethcing(false)
            setLoading(false)
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
                    const listRepo = await axiosInstance({method: 'GET', url})
                    const mappingRepo = listUser?.map((data) => {
                        if(data?.login === username) {
                            return {...data, repo: listRepo.data, isExpanded: !data.isExpanded}
                        }
                        return {...data}
                    })
                    setListUser(mappingRepo)
                    setLoading(false)
                } else {
                    handleExpandedItem(username)
                }
            }
         
        } catch(error) {
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
        onSelectUsername, 
        handleExpandedItem,
        setListUser,
        setFinalUsername,
        finalUserName,
        isFetching,
        setIsFethcing
    }
}


export default useHomeHooks