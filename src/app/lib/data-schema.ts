import { z } from "zod";

const EmissionResponseSchema = z.object({
    totalCo2Kg: z.number(),
    totalCategoriesCo2Kg: z.number(),
    categoriesPercent: z.number(),
    categories: z.object({
        energy: z.object({
            co2Kg: z.number(),
            percent: z.number(),
        }),
        food: z.object({
            co2Kg: z.number(),
            percent: z.number(),
        }),
        transport: z.object({
            co2Kg: z.number(),
            percent: z.number(),
        }),
        consumption: z.object({
            co2Kg: z.number(),
            percent: z.number(),
        }),
        public: z.object({
            co2Kg: z.number(),
            percent: z.number(),
        }),
    }),
});

export default EmissionResponseSchema;
