import { MemberSidebar } from '@/app/(main)/servers/[serverId]/channels/[channelId]/_components/member-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MemberWithUser, ServerWithMembersWithUsers } from '@/types'
import { HiUsers } from 'react-icons/hi2'

interface MemberMobileToggleProps {
  server?: ServerWithMembersWithUsers
  members?: MemberWithUser[]
}

export const MemberMobileToggle = ({
  server,
  members,
}: MemberMobileToggleProps) => {
  if (!server || !members) return null
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <HiUsers
            size={22}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex gap-0 p-0">
        <MemberSidebar server={server} members={members} />
      </SheetContent>
    </Sheet>
  )
}
