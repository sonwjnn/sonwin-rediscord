'use client'

import { RoleBadge } from '@/components/member/role-badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { UserAvatar } from '@/components/user-avatar'
import { EditProfileButton } from '@/components/voice-status/edit-profile-button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { stringToColor } from '@/lib/utils'
import { MemberRole, Server } from '@prisma/client'
import { usePalette } from 'color-thief-react'
import { format } from 'date-fns'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsDiscord } from 'react-icons/bs'

interface OwnButtonProps {
  server: Server
  role: MemberRole
}
export const OwnButton = ({ server, role }: OwnButtonProps) => {
  const user = useCurrentUser()

  const [bgColor, setBgColor] = useState<string>('')
  const { data: color } = usePalette(user?.image as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  useEffect(() => {
    if (color) {
      setBgColor(color?.[2] ?? '#e0e0e0')
    } else {
      const stringColor = stringToColor(user?.name || '')

      setBgColor(stringColor)
    }
  }, [color, user?.name])

  if (!user) return null

  return (
    <div>
      <div
        className="relative h-[60px] w-full rounded-t-md bg-gray-300"
        style={{ backgroundColor: bgColor }}
      >
        <EditProfileButton className="absolute right-1 top-1" />
      </div>
      <UserAvatar
        className="-top-4 left-8 scale-[2] ring-[3px] ring-zinc-200/90 dark:ring-[#1e1f22]"
        imageUrl={user.image || ''}
        name={user.name || ''}
        status={user.status}
      />
      <div className="relative mt-6 rounded-lg bg-white px-3 py-2 dark:bg-black">
        <Image
          src="/hashtag.png"
          height={28}
          width={28}
          alt="hashtag image"
          className="absolute -top-12 right-0 h-6 w-6  rounded bg-white object-cover p-0.5 text-white  dark:bg-black dark:text-black"
        />
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-xs">{user.bio}</p>
        <Separator className="mt-2" />
        <div className="my-2">
          <p className="text-xs font-bold">MEMBER SINCE</p>
          <div className="flex gap-x-3">
            <div className="flex items-center gap-x-1 py-2 text-xs">
              <BsDiscord className="text-[#ABAFB7]" size={14} />
              {format(new Date(user.createdAt), 'd MMM yyyy')}
            </div>

            <div className="flex items-center">
              <div className="size-1 rounded-full bg-[#4C4D55]" />
            </div>
            <div className="flex items-center gap-x-1 py-2 text-xs">
              <div className="relative rounded-full">
                <Avatar className="size-4">
                  <AvatarImage src={server?.image} className="object-cover" />
                  <AvatarFallback>{server?.name}</AvatarFallback>
                </Avatar>
              </div>
              {format(new Date(user.createdAt), 'd MMM yyyy')}
            </div>
          </div>
        </div>

        <div className="my-2">
          <p className="text-xs font-bold">ROLES</p>
          <div className="flex gap-x-3">
            <div className="flex items-center gap-x-1 py-2 text-xs">
              <RoleBadge role={role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
