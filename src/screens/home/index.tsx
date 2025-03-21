
"use client"
import '@/screens/home/styles/home-styles.css'
import React from 'react'
import useHome from '@/screens/home/hooks/useHome'
import ListCard from '@/components/card/ListCard'
import { useRouter, useSearchParams } from "next/navigation";
import EmptyState from '@/components/empty-state/empty-state'

const HomePage = () => {
    const {fetchListRepo, setUserName, username, listUser, onSelectUsername, setFinalUsername, finalUserName, isFetching} = useHome()
    const router = useRouter();
    const searchParams = useSearchParams();
    const onTypeSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            const {value} = event.target
            setUserName(value)
    }, [])

    const onEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {    
        if(event.key === 'Enter') {
            onSearchHandle()
        }
    }

    const onSearchHandle = () => {
        router.push(`?username=${username}`)

    }

    React.useEffect(() => {
        const usernameParam = searchParams.get('username')
        if(usernameParam) {
            fetchListRepo(usernameParam)
            setUserName(usernameParam)
            setFinalUsername(usernameParam)
        }
    }, [searchParams])

    const renderListUser = () => {
        if(listUser?.length > 0 && !isFetching) {
            return (
                <React.Fragment>
                    {listUser?.map((data, index) => <ListCard repos={data?.repo} onClick={() => onSelectUsername(data?.login || "")} key={index} title={data?.login || ''} isExpand={data?.isExpanded || false} />)}
                </React.Fragment>
            )

        }
        if(listUser?.length <= 0 && finalUserName?.length > 0 && !isFetching) {
            return <EmptyState />
        }
        return null
    }

    return (
        <div >
            <div>
                <input placeholder='Search username here..' value={username} onChange={onTypeSearch} onKeyDown={onEnterSearch} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' />
            </div>
            <div className='w-full button-container' >
                <button onClick={onSearchHandle} className='w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"' >Search</button>
            </div>
            {finalUserName?.length > 0 && (
            <div className='info-search' >
                Showing users for {finalUserName}
            </div>
            )}
            <div>
               {renderListUser()}
            </div>
        </div>
    )
}


export default HomePage