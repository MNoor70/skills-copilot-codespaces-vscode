import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDonationSchema, type InsertDonation } from "@shared/schema";
import { useCreateDonation } from "@/hooks/use-donations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heart } from "lucide-react";

interface DonationModalProps {
  trigger?: React.ReactNode;
}

export function DonationModal({ trigger }: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const mutation = useCreateDonation();

  const form = useForm<InsertDonation>({
    resolver: zodResolver(insertDonationSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 1000, // $10.00
      message: "",
    },
  });

  function onSubmit(data: InsertDonation) {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  const presetAmounts = [1000, 2500, 5000, 10000];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="rounded-full px-8 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105 transition-all">
            Donate Now <Heart className="ml-2 h-5 w-5 fill-current" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold text-primary text-center">Make a Difference</DialogTitle>
          <DialogDescription className="text-center">
            Your contribution directly impacts lives. 100% of donations go to the cause.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={form.watch("amount") === amount ? "default" : "outline"}
                  className="rounded-xl h-12 text-lg font-medium"
                  onClick={() => form.setValue("amount", amount)}
                >
                  ${amount / 100}
                </Button>
              ))}
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Amount (in cents)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Amount"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      className="text-lg font-semibold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Leave a message of support..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Processing..." : `Donate $${(form.watch("amount") / 100).toFixed(2)}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
