'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, ChevronDown, Building2, Rocket, Wrench, Handshake, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  { value: "Enterprise Licensing", icon: Building2 },
  { value: "Custom Deployment", icon: Rocket },
  { value: "Technical Support", icon: Wrench },
  { value: "Partnership", icon: Handshake },
  { value: "General Inquiry", icon: MessageSquare },
];

function FormInput({
  id,
  label,
  required,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </Label>
      <input
        id={id}
        className={cn(
          "flex h-11 w-full border bg-muted/50 dark:bg-white/[0.04] px-3.5 py-2 text-sm text-foreground",
          "border-border/60 dark:border-white/[0.08]",
          "placeholder:text-muted-foreground/60",
          "transition-all duration-200",
          "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary/20",
          "hover:border-border dark:hover:border-white/[0.12]",
          error && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
        )}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const selectedSubject = watch("subject");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center py-16 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-primary/10 dark:bg-primary/15 flex items-center justify-center mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Message prepared
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Your email client should have opened with the message. If not, reach us at{" "}
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
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput
              id="name"
              label="Name"
              required
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register("name")}
            />
            <FormInput
              id="email"
              label="Email"
              required
              type="email"
              placeholder="jane@company.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput
              id="company"
              label="Company"
              placeholder="Example Inc. (optional)"
              {...register("company")}
            />

            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Subject <span className="text-primary ml-0.5">*</span>
              </Label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSubjectOpen(!subjectOpen)}
                  onBlur={() => setTimeout(() => setSubjectOpen(false), 150)}
                  className={cn(
                    "flex h-11 w-full items-center justify-between border px-3.5 py-2 text-sm text-left",
                    "bg-muted/50 dark:bg-white/[0.04]",
                    "border-border/60 dark:border-white/[0.08]",
                    "transition-all duration-200",
                    "hover:border-border dark:hover:border-white/[0.12]",
                    subjectOpen && "border-primary/50 ring-2 ring-primary/10 dark:ring-primary/20",
                    errors.subject && "border-destructive/50",
                    !selectedSubject && "text-muted-foreground/60",
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {selectedSubject ? (
                      (() => {
                        const match = subjects.find(s => s.value === selectedSubject);
                        const Icon = match?.icon;
                        return (
                          <>
                            {Icon && <Icon className="w-4 h-4 text-primary" />}
                            <span className="text-foreground">{selectedSubject}</span>
                          </>
                        );
                      })()
                    ) : (
                      "Select a topic"
                    )}
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
                    subjectOpen && "rotate-180",
                  )} />
                </button>

                <AnimatePresence>
                  {subjectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute z-50 top-full left-0 right-0 mt-1.5",
                        "border shadow-lg",
                        "bg-popover dark:bg-zinc-900 border-border/60 dark:border-white/[0.1]",
                        "overflow-hidden",
                      )}
                    >
                      {subjects.map((subject) => (
                        <button
                          key={subject.value}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setValue("subject", subject.value);
                            trigger("subject");
                            setSubjectOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 px-3.5 py-2.5 text-sm transition-colors",
                            "bg-popover hover:bg-muted/80 dark:bg-zinc-900 dark:hover:bg-white/[0.06]",
                            selectedSubject === subject.value
                              ? "text-primary font-medium !bg-primary/5 dark:!bg-primary/10"
                              : "text-foreground",
                          )}
                        >
                          <subject.icon className={cn(
                            "w-4 h-4 shrink-0",
                            selectedSubject === subject.value ? "text-primary" : "text-muted-foreground",
                          )} />
                          <span>{subject.value}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {errors.subject.message}
                </motion.p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Message <span className="text-primary ml-0.5">*</span>
            </Label>
            <textarea
              id="message"
              placeholder="Tell us about your project, requirements, or questions..."
              className={cn(
                "flex w-full border px-3.5 py-3 text-sm text-foreground",
                "bg-muted/50 dark:bg-white/[0.04]",
                "border-border/60 dark:border-white/[0.08]",
                "placeholder:text-muted-foreground/60",
                "transition-all duration-200 min-h-[140px] resize-none leading-relaxed",
                "focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary/20",
                "hover:border-border dark:hover:border-white/[0.12]",
                errors.message && "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
              )}
              {...register("message")}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-destructive mt-1"
              >
                {errors.message.message}
              </motion.p>
            )}
          </div>

          <div className="pt-1">
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-sm font-semibold tracking-wide uppercase"
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

          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
