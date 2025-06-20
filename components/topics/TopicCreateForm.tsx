'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { createTopics } from "@/actions/create-topics"
import { useActionState } from "react"

const TopicCreateForm = () => {
  const[formstate, action] = useActionState(createTopics,{errors:{}})
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">New Topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <form action={action}>
          <DialogHeader>
            <DialogTitle>Create an Topic</DialogTitle>
            <DialogDescription>
              Write a topic that you want to discuss.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-1">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name"/>
            </div>

            {formstate.errors.name && <p className="text-sm text-red-600 p-2">{formstate.errors.name}</p>}

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description"/>
            </div>

            {formstate.errors.description && <p className="text-sm text-red-600 p-2">{formstate.errors.description}</p>}
            {formstate.errors.formError && <div className="border border-red-600 bg-red-200 p-2 rounded">{formstate.errors.formError}</div>}

          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="submit"variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default TopicCreateForm;
