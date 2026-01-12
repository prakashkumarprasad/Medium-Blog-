import z from "zod";
// Changed username to email
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});
// Fixed: signin doesn't need name, and uses email
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
export const createBlog = z.object({
    title: z.string(),
    content: z.string()
});
export const updateBlog = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string() // Changed from number to string since your IDs are UUIDs
});
//# sourceMappingURL=index.js.map