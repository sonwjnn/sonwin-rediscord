'use client'

import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import { useModal } from '@/store/use-modal-store'
import { ServerWithMembersWithUsers } from '@/types'
import { ChannelType, MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'

interface SectionProps {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithUsers
  isSettings?: boolean
}

export const Section = ({
  label,
  role,
  sectionType,
  channelType,
  server,
  isSettings = false,
}: SectionProps) => {
  const { onOpen } = useModal()

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <Hint label="Create Channel" side="top">
          <button
            onClick={() => onOpen('createChannel', { channelType, server })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Plus className="size-4" />
          </button>
        </Hint>
      )}
      {isSettings && role === MemberRole.ADMIN && sectionType === 'members' && (
        <Hint label="Manage Members" side="top">
          <button
            onClick={() => onOpen('members', { server })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Settings className="size-4" />
          </button>
        </Hint>
      )}
    </div>
  )
}

export const SectionSkeleton = () => (
  <div className="flex items-center  py-2">
    <Skeleton className="w-8" />
  </div>
)
