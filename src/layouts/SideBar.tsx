import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

export function SideBar() {
  return (
    <aside className="scrollbar-hidden sticky top-0 ml-1 flex flex-col overflow-y-auto pb-4 lg:hidden">
      <SmallSidebarItem Icon={Home} title="Home" url="/" />
      <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSidebarItem
        Icon={Clapperboard}
        title="Subscriptions"
        url="/subscriptions"
      />
      <SmallSidebarItem Icon={Library} title="Library" url="/library" />
    </aside>
  );
}

type smallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: smallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "flex flex-col items-center gap-1 rounded-lg px-1 py-4",
      )}
    >
      <Icon className="size-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}
