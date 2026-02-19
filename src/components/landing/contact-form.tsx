'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Build mailto link and open it
    const subjectLine = `[${data.subject}] Contact from ${data.name}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      `Subject: ${data.subject}`,
      ``,
      `Message:`,
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoLink = `mailto:office@zequent.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;

    await new Promise((resolve) => setTimeout(resolve, 600));
    
    window.location.href = mailtoLink;

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 5000);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center py-12"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <CheckCircle2 className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Message prepared
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your email client should have opened with the message. If it didn&apos;t, you can reach us directly at{" "}
            <a
              href="mailto:office@zequent.com"
              className="text-primary hover:underline font-medium"
            >
              office@zequent.com
            </a>
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="bg-background/50 border-border/80 focus-visible:ring-primary/30 h-11"
                {...register("name")}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="bg-background/50 border-border/80 focus-visible:ring-primary/30 h-11"
                {...register("email")}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-foreground">
                Company
              </Label>
              <Input
                id="company"
                placeholder="Your company (optional)"
                className="bg-background/50 border-border/80 focus-visible:ring-primary/30 h-11"
                {...register("company")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("subject", value);
                  trigger("subject");
                }}
              >
                <SelectTrigger className="bg-background/50 border-border/80 focus:ring-primary/30 h-11">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enterprise Licensing">Enterprise Licensing</SelectItem>
                  <SelectItem value="Custom Deployment">Custom Deployment</SelectItem>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-foreground">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, requirements, or questions..."
              className="bg-background/50 border-border/80 focus-visible:ring-primary/30 min-h-[130px] resize-none"
              {...register("message")}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive"
              >
                {errors.message.message}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Preparing...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
