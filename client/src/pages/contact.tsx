import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Send, MapPin, Mail, Github, Clock, CheckCircle } from "lucide-react";
import { SiX } from "react-icons/si";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/section-header";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@edcode.dev",
    href: "mailto:hello@edcode.dev",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kampala, Uganda",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Open to collaborations",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/edcode",
  },
  {
    icon: SiX,
    label: "X (Twitter)",
    href: "https://x.com/edcode",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@edcode.dev",
  },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-24" data-testid="page-contact">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Get in Touch"
            subtitle="Have a project in mind? Let's build something amazing together."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardContent className="p-6 md:p-8">
                  {mutation.isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. I'll get back to you as soon as possible.
                      </p>
                      <Button onClick={() => mutation.reset()}>
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} data-testid="input-name" />
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
                                  <Input placeholder="your@email.com" type="email" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="What's this about?" {...field} data-testid="input-subject" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell me about your project or idea..."
                                  className="min-h-32 resize-none"
                                  {...field}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={mutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {mutation.isPending ? (
                            <>Sending...</>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="font-medium hover:text-primary transition-colors"
                              data-testid={`link-contact-${info.label.toLowerCase()}`}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.label}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`link-social-${link.label.toLowerCase().replace(/[^a-z]/g, '')}`}
                        >
                          <link.icon className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Open to Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    I'm currently available for freelance projects, collaborations, 
                    and full-time opportunities. Whether it's AI, Web3, or full-stack 
                    development – I'd love to hear about your project.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
