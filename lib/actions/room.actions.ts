"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";

export const createDocument = async ({
	userId,
	email,
}: CreateDocumentParams) => {
	try {
		const roomId = nanoid();
		const metadata: RoomMetadata = {
			creatorId: userId,
			email,
			title: "Untitled",
		};

		const usersAccesses: RoomAccesses = {
			[email]: ["room:write"],
		};

		const room = await liveblocks.createRoom(roomId, {
			metadata,
			usersAccesses,
			defaultAccesses: ["room:write"],
		});

		revalidatePath("/");

		return parseStringify(room);
	} catch (error) {
		console.log(`Error happened while creating a room: ${error}`);
	}
};

export const getDocument = async ({
	roomId,
	userId,
}: {
	roomId: string;
	userId: string;
}) => {
	try {
		const room = await liveblocks.getRoom(roomId);
		//TODO: Bring this back after implementing access control
		// const hasAccessRoom = Object.keys(room.usersAccesses).includes(userId);

		// if (!hasAccessRoom) {
		// 	throw new Error("You don't have access to this document");
		// }

		return parseStringify(room);
	} catch (error) {
		console.error(`Error happened while fetching a room: ${error}`);
	}
};

export const updateDocument = async (roomId: string, title: string) => {
	try {
		const updatedRoom = await liveblocks.updateRoom(roomId, {
			metadata: {
				title,
			},
		});

		revalidatePath(`documents/${roomId}`);

		return parseStringify(updatedRoom);
	} catch (error) {
		console.error(`Error happened while updating a room: ${error}`);
	}
};
