import { useUser } from "@/lib/auth"

export const Home = () => {
  const { data: user } = useUser();

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome! {user.name}</h1>
      <p>
        This is a Home page.
      </p>
    </div>
  )
}
