import { Track } from "@/data/tracks";
import { cn } from "@/lib/utils";

export const TrackCard = ({ track, ...props }: { track: Track } & React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 justify-between flex flex-col space-y-4",
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        props.className
      )}
    >
      {/* Header */}
      <div className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">

      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 space-y-1">
        {/* <ClipboardSignature /> */}
        <div className="font-semibold text-lg">
          {/* {track.title} */}
          Intermediate Backend Study Group
        </div>
        <div className="font-normal text-xs leading-5 text-muted-foreground">
          {/* {track.description} */}
          Skill up on backend development with Node.js, Express, and MongoDB
        </div>
      </div>
    </div>
  )
}