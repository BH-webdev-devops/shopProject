'use client'


import {useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Contact = () => {
    const [from, setFrom] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const {sentEmail} : any = useAuth()
    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault()
        try{
            const response = await sentEmail(from, subject, text)
            if (response.status == 400) {
                console.log(response)
                alert('Bad request')
            }
            else {
                alert('Your Message was sent succesfully')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Sent an email
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                                from
                            </label>
                            <div className="mt-2">
                                <input
                                    id="from"
                                    name="from"
                                    type="from"
                                    required
                                    onChange={e => setFrom(e.target.value)}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="text" className="block text-sm/6 font-medium text-white">
                                    Subject
                                </label>
                               
                            </div>
                            <div className="mt-2">
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    required
                                    onChange={e => setSubject(e.target.value) }
                                    autoComplete="current-password"
                                    className="block w-full text-black rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="text" className="block text-sm/6 font-medium text-white">
                                    Text
                                </label>
                               
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="text"
                                    name="text"
                                    required
                                    onChange={e => setText(e.target.value) }
                                    autoComplete="current-password"
                                    className="block w-full text-black rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sent message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Contact