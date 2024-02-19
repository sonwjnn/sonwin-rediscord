import StatusBadge from '@/components/ui/badge/status-badge'
// import { ListItem } from '@/components/ui/list'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { UserStatuses } from '@/types'
import { Statuses } from '@prisma/client'

import { PopupItem } from './item'

interface UserStatusProps {
  statuses: { value: string }[]
  handleSubmit: (status: UserStatuses) => void
  setOpen: (open: boolean) => void
}

export const UserStatus = ({
  statuses,
  handleSubmit,
  setOpen,
}: UserStatusProps) => {
  return (
    <div className="leading-[16px]">
      {statuses.map((status, index) => (
        <>
          <PopupItem
            onClick={() => {
              setOpen(false), handleSubmit(status.value)
            }}
            className="group my-1 min-w-[180px] max-w-[380px] flex-col  items-start rounded hover:bg-[#4752c4] hover:text-white dark:hover:bg-[#4752c4]"
            key={index}
          >
            <div className="flex items-center">
              <StatusBadge
                className="relative h-[9px]  w-[9px] !border-none group-hover:bg-white"
                status={status.value}
              />
              <p className="ml-2 capitalize">{status.value.toLowerCase()}</p>
            </div>
            <div className="ml-5 text-[12px]">
              {status.value === Statuses.OFFLINE && (
                <p>
                  You won&apos;t appear as available, but you&apos;ll have
                  access to all Discord features.
                </p>
              )}
              {status.value === Statuses.DND && (
                <p>You will not receive desktop notifications.</p>
              )}
            </div>
          </PopupItem>
          <Separator
            className={cn(
              `my-2 h-[1px] w-full`,
              status.value === Statuses.ONLINE ? 'block' : 'hidden'
            )}
          />
        </>
      ))}
    </div>
  )
}
