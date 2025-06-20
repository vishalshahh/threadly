'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib"
import { Topic } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const createTopicSchema = z.object({
    name: z.string().min(4).regex(/^[a-z-A-Z]+$/, { message: "Name must be at least 4 characters long and contain only lowercase letters." }),
    description: z.string().min(10).max(1000, { message: "Description must be between 10 and 1000 characters." })
})

type CreateTopicFormState = {
    errors: {
        name?: string[],
        description?: string[],
        formError?: string[]
    }
}

export const createTopics = async (prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> => {

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()

    if (!session || !session.user) {
        return {
            errors: {
                formError: ['You must have to login first!']
            }
        }
    }
    let topic: Topic
    try {
        topic = await prisma.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formError: ['Something went wrong!']
                }
            }
        }
    }
    revalidatePath('/')
    redirect(`/topics/${topic.slug}`)
}