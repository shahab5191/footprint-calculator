import { z } from "zod";

const AuthSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    token_type: z.string()
})

export default AuthSchema
