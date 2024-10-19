import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type LeaderboardProps = {
  caption?: string
}

export const Leaderboard = ({ caption }: LeaderboardProps) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Position</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell className="text-right">100</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
