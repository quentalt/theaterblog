"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import {AppBar} from "@/components/app-bar";

export default function ProfilePage() {
    const [avatar, setAvatar] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const { data: session, update } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
    }, [session, router])

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0])
            setAvatarPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!avatar) return

        const formData = new FormData()
        formData.append('avatar', avatar)

        try {
            const response = await fetch('/api/user/avatar', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const { avatarUrl } = await response.json()
                await update({ avatar: avatarUrl })
                toast.success('Avatar mis à jour avec succès')
            } else {
                toast.error('Erreur lors de la mise à jour de l\'avatar')
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'avatar:', error)
            toast.error('Erreur lors de la mise à jour de l\'avatar')
        }
    }

    return (
        <><AppBar/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Profil</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {(avatarPreview || session?.user?.image) && (
                            <Image
                                src={avatarPreview || session?.user?.image || '/placeholder.svg'}
                                alt="Avatar"
                                width={100}
                                height={100}
                                className="rounded-full"/>
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}/>
                    </div>
                    <Button type="submit">Mettre à jour l'avatar</Button>
                </form>
            </div>
        </>
    )
}

