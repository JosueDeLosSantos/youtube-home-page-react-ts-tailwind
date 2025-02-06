import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Children, ElementType, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeadFirstSection } from "./PageHead";

export function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`scrollbar-hidden sticky top-0 ml-1 flex flex-col overflow-y-auto pb-4 max-md:hidden ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          className="fixed inset-0 z-[999] bg-secondary-dark opacity-50 lg:hidden"
          onClick={close}
        />
      )}
      <aside
        className={`scrollbar-hidden absolute top-0 w-56 flex-col gap-2 overflow-y-auto px-2 pb-4 lg:sticky ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "z-[999] flex max-h-screen bg-white" : "hidden"}`}
      >
        <div className="sticky top-0 bg-white px-2 pb-4 pt-2 lg:hidden">
          <PageHeadFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImagUrl={Home}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            IconOrImagUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImagUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImagUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImagUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImagUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImagUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImagUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImagUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImagUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImagUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImagUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImagUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImagUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            IconOrImagUrl={Newspaper}
            title="News"
            url="/news"
          />
          <LargeSidebarItem
            IconOrImagUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImagUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImagUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImagUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
      </aside>
    </>
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

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="mb-1 ml-4 mt-2 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setExpanded((e) => !e)} // toggles variable
          variant="ghost"
          className="flex w-full items-center gap-4 rounded-lg p-3"
        >
          <ButtonIcon className="size-6" />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {isExpanded ? "Show less" : "Show more"}
          </div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImagUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImagUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex w-full items-center gap-4 rounded-lg p-3 ${
          isActive ? "bg-neutral-100 font-bold hover:bg-secondary" : undefined
        }`,
      )}
    >
      {typeof IconOrImagUrl === "string" ? (
        <img src={IconOrImagUrl} className="size-6 rounded-full" />
      ) : (
        <IconOrImagUrl className="size-6" />
      )}
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </div>
    </a>
  );
}
