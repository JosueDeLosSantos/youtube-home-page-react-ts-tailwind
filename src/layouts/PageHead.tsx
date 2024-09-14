import Logo from "../assets/Logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, User, Video } from "lucide-react";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

export function PageHead() {
  const [fullWithSearch, setFullWithSearch] = useState(false);

  return (
    <div className="mx-4 mb-6 mt-2 flex justify-between gap-10 lg:gap-20">
      <PageHeadFirstSection hidden={fullWithSearch} />
      <form
        className={`flex-grow justify-center gap-4 md:flex ${
          fullWithSearch ? "flex" : "hidden"
        }`}
      >
        {fullWithSearch && (
          <Button
            onClick={() => setFullWithSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex max-w-[600px] flex-grow">
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-l-full border border-secondary-border px-4 py-1 text-lg shadow-inner shadow-secondary outline-none focus:border-blue-500"
          />
          <Button className="shrink-0 rounded-r-full border border-l-0 border-secondary-border px-4 py-2">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex shrink-0 md:gap-2 ${fullWithSearch ? "hidden" : "flex"}`}
      >
        <Button
          onClick={() => setFullWithSearch(true)}
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Video />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeadFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeadFirstSection({
  hidden = false,
}: PageHeadFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`flex shrink-0 items-center gap-4 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={Logo} className="h-6" />
      </a>
    </div>
  );
}
