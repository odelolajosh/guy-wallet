import { Topbar } from "@/components/topbar";
import { TrackCard } from "@/components/track-card";
import { Grid } from "@/components/ui/grid";
import { useTracks } from "@/data/tracks";

export const Home = () => {
  const { data: tracks } = useTracks();

  return (
    <div className="space-y-8">
      <Topbar />
      <div className="max-w-8xl mx-auto px-4 lg:px-8 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">All tracks in session</h2>
          <p className="text-sm text-muted-foreground">Find the right track for you</p>
        </section>
        <Grid>
          {tracks?.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </Grid>
      </div>
    </div>
  )
}
