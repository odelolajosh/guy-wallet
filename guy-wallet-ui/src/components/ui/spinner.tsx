import { cn } from '@/lib/utils';
import { LoaderCircle, LucideProps } from 'lucide-react';

export const Spinner = (props: Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>) => {
  return (
    <LoaderCircle {...props} className={cn("animate-spin h-6 w-6 text-foreground", props.className)} />
  )
}