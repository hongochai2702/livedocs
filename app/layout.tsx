import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "LiveDocs",
	description: "Your go-to collaborative editor",
};

/**
 * The root layout component, which sets up the HTML skeleton and applies
 * base styling to the `<body>`.
 *
 * @param children - The children to render inside the layout.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: { colorPrimary: "#3371FF", fontSize: "16px" },
			}}
		>
			<html lang="en">
				<body
					className={cn(
						"min-h-screen font-sans antialiased",
						fontSans.variable
					)}
				>
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}
