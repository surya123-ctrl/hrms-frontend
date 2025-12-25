import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8">
                <h1 className='text-3xl font-bold tracking-tight text-primary'>HRMS Portal</h1>
                <p className="text-muted-foreground mt-2">Manage your workforce efficiently</p>
            </div>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout