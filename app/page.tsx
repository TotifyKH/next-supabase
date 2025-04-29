import TaskForm from '../components/feature/TaskForm'
import TaskList from '../components/feature/TaskList'
import { TaskProvider } from '../components/feature/TaskContext'

// Mock data for demonstration
const mockTasks = [
  {
    id: 1,
    title: 'Learn Next.js',
    description: 'Study Next.js documentation and build a project',
    created_at: '2024-03-20T10:00:00Z'
  },
  {
    id: 2,
    title: 'Setup Supabase',
    description: 'Create a new Supabase project and configure it',
    created_at: '2024-03-21T14:30:00Z'
  }
]

export default function Home() {
  return (
    <TaskProvider>
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Task List</h1>
        
        <TaskForm />
        <TaskList />
      </main>
    </TaskProvider>
  )
}
