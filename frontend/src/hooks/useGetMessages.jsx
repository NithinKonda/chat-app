import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConverstaion'

const useGetMessages = () => {
    const {messages,setMessages,selectedConversation} = useConversation()
    const [loading,setLoading] = useState(false)
    useEffect(()=> {
        const getMessages = async () =>
        {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
                console.log(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])
  return {messages,loading}
}

export default useGetMessages