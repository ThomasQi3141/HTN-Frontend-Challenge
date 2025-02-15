import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MenuButton from "./MenuButton";
import icon from "../icon.png";
import LoginButton from "./LoginButton";

// Sidebar component for the events page (only displays when screen is large enough)
const EventsSidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-bgSecondary p-6 flex flex-col space-y-6 shadow-lg lg:flex hidden">
      {/* Hack The North Logo + Text (click to go home) */}
      <Link
        href="/"
        className="flex items-center space-x-3 hover:opacity-80 transition">
        <Image src={icon} alt="Hack The North Logo" width={40} height={40} />
        <span className="text-xl font-bold text-primary">Hack The North</span>
      </Link>

      {/* Nav buttons */}
      <div className="flex flex-col space-y-2">
        <MenuButton onClick={() => router.push("/")}>Home</MenuButton>
        <LoginButton />
      </div>
    </aside>
  );
};

export default EventsSidebar;
