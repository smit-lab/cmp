"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { addNewStep } from "@/lib/action";
import { addStepSchema } from "@/lib/zod-definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { LoaderCircle, PlusCircle } from "lucide-react";

type inputs = z.infer<typeof addStepSchema>;

const AddStepDialog = ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) => {
  const form = useForm<inputs>({
    resolver: zodResolver(addStepSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  async function submitData(values: inputs) {
    const formData = {
      title: values.title,
      description: values.description,
      _id: id,
    };
    console.log(formData);

    const result = await addNewStep(formData);
    console.log("Res:", { issuse: result?.issues, message: result.message });
  }
  return (
    <Dialog>
      <DialogTrigger asChild disabled={currentStatus === "complete"}>
        <Button variant={"ghost"} className="h-7 gap-1" size={"sm"}>
          <PlusCircle className="w-3.5 h-3.5" />
          Add step
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Add new step</DialogTitle>
          <DialogDescription>All fields are mandatory.</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(submitData)}
              className="grid gap-5 pt-8"
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Step title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descirption</FormLabel>
                    <FormControl>
                      <Input placeholder="Step description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-6 gap-2 items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
                Add project
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddStepDialog;
