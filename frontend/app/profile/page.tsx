'use client'

import { useAuth } from "../context/AuthContext";
import {useRouter} from 'next/navigation'
import { useEffect } from "react";
import Image from 'next/image';

export default function Profile() {

  const { user, loading, isAuthenticated }: any = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/register');
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Redirecting...</p>; 
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="User Profile"
          src={`http://localhost:3001${user.photo}`}
          width={100}
          height={100}
          className="mx-auto h-24 w-24 rounded-full"
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          {user.name}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          ID: {user.id}
        </p>
        <p className="mt-1 text-center text-sm text-gray-500">
          {user.email}
        </p>
      </div>
    </div>
  );
}