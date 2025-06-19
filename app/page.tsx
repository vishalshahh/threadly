import { Button } from "@/components/ui/button";
import { signIn } from "./actions/sign-in";
import { signOut } from "./actions/sign-out";

export default function Home() {
  return (
    <div>
      <h1>Threadly - The Threading App</h1>
      <form action={signIn}>
        <Button type="submit">SignIn</Button>
      </form>

      <form action={signOut}>
        <Button type="submit">SignOut</Button>
      </form>
    </div>
  );
}
