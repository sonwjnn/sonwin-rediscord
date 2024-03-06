'use server'

import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

import { CustomUserStatusSchema } from '@/schemas'
import { Statuses } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateCustomUserStatus = async (
	values: z.infer<typeof CustomUserStatusSchema>,
	userId: string,
) => {
	const validatedFields = CustomUserStatusSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { bio, type, cleaningDelay } = validatedFields.data
	const user = await currentUser()

	if (!user) {
		return { error: 'Unauthorized!' }
	}

	const response = await db.user.update({
		where: {
			id: userId,
		},
		data: {
			bio,
			status: type,
			cleaningDelay,
		},
	})

	revalidatePath(`/`)

	return response
}

export const updateUserStatus = async (
	status: Statuses,
	userId: string,
) => {
	try {
		const user = await currentUser()

		if (!user) {
			throw new Error('Unauthorized')
		}

		const response = await db.user.update({
			where: {
				id: userId,
			},
			data: {
				status,
			},
		})
		revalidatePath(`/`)

		return response
	} catch {
		throw new Error('Internal Error')
	}
}