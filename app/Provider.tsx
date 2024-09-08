"use client";

import Loader from "@/components/Loader";
import {
	ClientSideSuspense,
	LiveblocksProvider,
} from "@liveblocks/react/suspense";
import React from "react";

interface ProviderProps {
	children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
	return (
		<LiveblocksProvider
			authEndpoint={process.env.NEXT_PUBLIC_LIVEBLOCKS_AUTH_ENDPOINT as string}
		>
			<ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
		</LiveblocksProvider>
	);
};

export default Provider;
