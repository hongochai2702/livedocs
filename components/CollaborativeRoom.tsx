"use client";

import { Editor } from "@/components/editor/Editor";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React from "react";
import Loader from "./Loader";
import Header from "./Header";

const CollaborativeRoom: React.FC<CollaborativeRoomProps> = ({
	currentUserType,
	roomId,
}) => {
	return (
		<RoomProvider id={roomId} initialPresence={{ userType: currentUserType }}>
			<ClientSideSuspense fallback={<Loader />}>
				<div className="collaborative-room">
					<Header>
						<div className="flex w-fit items-center justify-center gap-2">
							<p className="document-title">Share</p>
						</div>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</Header>
					<Editor />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
};

export default CollaborativeRoom;
