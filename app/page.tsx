'use client'
import TaskForm from '../components/feature/TaskForm'
import TaskList from '../components/feature/TaskList'
import { TaskProvider } from '../components/feature/TaskContext'
import Auth from '../components/feature/Auth'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Home() {
  const supabase = createClient()
  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    console.log(session)
    setSession(session)
  }

  useEffect(() => {
    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <TaskProvider>
      {session ? (
        <main className="max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Task List</h1>

          <TaskForm />
          <TaskList />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </main>
      ) : (
        <Auth />
      )}
    </TaskProvider>
  )
}
