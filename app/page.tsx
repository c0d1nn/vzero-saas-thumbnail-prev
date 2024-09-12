'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { motion } from "framer-motion";

export default function Home() {
	const { isAuthenticated } = useKindeAuth();

	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center space-y-8 max-w-4xl w-full z-10"
				>
					<h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
						YouTube Thumbnail Previewer
					</h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
					>
						Create and preview your YouTube thumbnails in a realistic environment. Optimize your content for maximum engagement.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.8 }}
						className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
					>
						<RegisterLink>
							<Button size="lg" className="w-full sm:w-auto">Get Started</Button>
						</RegisterLink>
						<Link href="/pricing">
							<Button size="lg" variant="outline" className="w-full sm:w-auto">View Pricing</Button>
						</Link>
					</motion.div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9, duration: 0.8 }}
					className="mt-16 w-full max-w-5xl mx-auto relative"
				>
					<div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
					<div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
						<img
							src="https://utfs.io/f/5de68209-592e-4b44-8cc6-0017789450ba-4vrky1.png"
							 alt="YouTube Thumbnail Previewer Demo"
							 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
						/>
					</div>
				</motion.div>
			</main>
			<footer className="border-t mt-16">
				<div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
					<p className="text-center text-sm leading-5 text-muted-foreground">
						© 2024 YouTube Thumbnail Previewer. All rights reserved.
					</p>
				</div>
			</footer>

		</div>
	)
}
