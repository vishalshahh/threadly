'use server'

export const createTopics = async(formData: FormDate) => {
    const name = formData.get('name')
    const description = formData.get('description')

    console.log(name, description)
}