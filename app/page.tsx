import Profile from "@/components/Profile";
import LoginUserOnly from "@/components/providers/isAuthenticated";

export default function Home() {
  return (
    <LoginUserOnly>
      <div className="h-[100vh] flex justify-center items-center">
        <Profile />
      </div>
    </LoginUserOnly>
  );
}
