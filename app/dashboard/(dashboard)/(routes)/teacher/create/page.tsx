"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { title } from "process";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/dashboard/teacher/courses/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong!");
      // console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Name your course</h1>
      <p className="text-sm text-slate-600">
        Give your course a name that will help learners understand what the
        course is about. You can change the name at any time.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g., 'Advanced Web Development'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Link href={"/dashboard"} className="">
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </Link>

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePage;
