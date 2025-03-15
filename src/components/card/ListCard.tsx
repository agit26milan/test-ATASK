import React from 'react'
import "./styles/card-styles.css"
import { RepoItem } from '@/screens/home/interfaces/response'
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";

interface ListCardProps {
    title:string
    isExpand: boolean
    onClick?:() => void
    repos?:RepoItem[]
}

const ListCard:React.FC<ListCardProps> = (props) => {
    const {title, onClick, isExpand, repos} = props

    const renderListRepo = (repo: RepoItem, index:number) => (
        <div className='card-repo w-full bg-white border border-gray-200 rounded-2xl' key={index}>
            <div className='flex items-center' >
                <h3>
                {repo.full_name}
                </h3>
                <div className='flex items-center ml-auto' >
                    <div className='font-bold' >{repo?.stargazers_count}</div>
                    <IoIosStar/>
                </div>
            </div>
            <p>
                {repo.description || '-'}
            </p>
        </div>
    )

    return (
       <React.Fragment>
         <div onClick={onClick} className='card-container bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300' >
            <div className='flex items-center' >
                <p>{title}</p> {!isExpand ? <AiFillCaretDown className='ml-auto' /> : <AiFillCaretUp className='ml-auto'/>
                }

            </div>
        </div>
        {isExpand ? repos?.map((data, index) => renderListRepo(data, index)) : null}

       </React.Fragment>
    )
}


export default React.memo(ListCard)