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

import { addNewProject } from "@/lib/action";
import { addProjectSchema } from "@/lib/zod-definitions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { LoaderCircle, PlusCircle } from "lucide-react";

type inputs = z.infer<typeof addProjectSchema>;

const AddProjectDialog = () => {
  const form = useForm<inputs>({
    resolver: zodResolver(addProjectSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = form;

  async function submitData(values: inputs) {
    const result = await addNewProject(values);
    // console.log("Client:", { issuse: result?.issues, message: result.message });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-7 gap-1" size={"sm"}>
          <PlusCircle className="w-3.5 h-3.5" />
          Add project
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription>All fields are mandatory.</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(submitData)}
              className="grid gap-5 pt-8"
            >
              <FormField
                control={control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="1999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="smit@example.com"
                        type="email"
                        {...field}
                      />
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

export default AddProjectDialog;
