"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  createProfile,
  Gender,
  selectGenderFromProfile,
  selectNameFromProfile
} from "@/lib/redux/profile-slice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"

const FormSchema = z.object({
  gender: z.enum([Gender.MALE, Gender.FEMALE], {
    required_error: "Please select a gender"
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  })
})

export function CreateProfileForm() {
  const dispatch = useAppDispatch()
  const gender = useAppSelector(selectGenderFromProfile)
  const name = useAppSelector(selectNameFromProfile)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { gender, name }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(createProfile(data))
    toast.success("Profile was created successfully")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose your gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="just a dev"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
