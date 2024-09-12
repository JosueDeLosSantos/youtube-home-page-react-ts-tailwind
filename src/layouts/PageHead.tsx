import Logo from "../assets/Logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, User, Video } from "lucide-react";
import { Button } from "../components/Button";
import { useState } from "react";

export function PageHead() {
	const [fullWithSearch, setFullWithSearch] = useState(false);
	return (
		<div className='flex gap-10 lg:gap-20 justify-between mt-2 mb-6 mx-4'>
			<div
				className={`flex gap-4 items-center shrink-0 ${
					fullWithSearch ? "hidden" : "flex"
				}`}
			>
				<Button variant='ghost' size='icon'>
					<Menu />
				</Button>
				<a href='/'>
					<img src={Logo} className='h-6' />
				</a>
			</div>
			<form
				className={`md:flex gap-4 flex-grow justify-center ${
					fullWithSearch ? "flex" : "hidden"
				}`}
			>
				{fullWithSearch && (
					<Button
						onClick={() => setFullWithSearch(false)}
						type='button'
						size='icon'
						variant='ghost'
						className='shrink-0'
					>
						<ArrowLeft />
					</Button>
				)}
				<div className='flex flex-grow max-w-[600px]'>
					<input
						type='search'
						placeholder='Search'
						className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 w-full text-lg outline-none focus:border-blue-500'
					/>
					<Button className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0 shrink-0'>
						<Search />
					</Button>
				</div>
				<Button type='button' size='icon' className='shrink-0'>
					<Mic />
				</Button>
			</form>
			<div
				className={`flex shrink-0 md:gap-2 ${fullWithSearch ? "hidden" : "flex"}`}
			>
				<Button
					onClick={() => setFullWithSearch(true)}
					variant='ghost'
					size='icon'
					className='md:hidden'
				>
					<Search />
				</Button>
				<Button variant='ghost' size='icon' className='md:hidden'>
					<Mic />
				</Button>
				<Button variant='ghost' size='icon'>
					<Video />
				</Button>
				<Button variant='ghost' size='icon'>
					<Bell />
				</Button>
				<Button variant='ghost' size='icon'>
					<User />
				</Button>
			</div>
		</div>
	);
}
