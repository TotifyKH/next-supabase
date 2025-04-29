'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

type AuthMode = 'signin' | 'signup'

export default function Auth() {
	const [mode, setMode] = useState<AuthMode>('signin')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			if (mode === 'signin') {
				const supabase = createClient()
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				})
				if (error) throw error
			} else {
				const supabase = createClient()
				const { error } = await supabase.auth.signUp({
					email,
					password
				})
				if (error) throw error
			}
		} catch (error) {
			console.error('Auth error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
			<div className="flex justify-center space-x-4 mb-6">
				<button
					onClick={() => setMode('signin')}
					className={`px-4 py-2 rounded-md ${mode === 'signin'
						? 'bg-blue-500 text-white'
						: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
						}`}
				>
					Sign In
				</button>
				<button
					onClick={() => setMode('signup')}
					className={`px-4 py-2 rounded-md ${mode === 'signup'
						? 'bg-blue-500 text-white'
						: 'bg-gray-700 text-gray-300 hover:bg-gray-600'
						}`}
				>
					Sign Up
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				{mode === 'signup' && (
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
							required={mode === 'signup'}
						/>
					</div>
				)}

				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
						required
					/>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
						required
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
				>
					{isLoading
						? 'Processing...'
						: mode === 'signin'
							? 'Sign In'
							: 'Sign Up'}
				</button>
			</form>
		</div>
	)
}
