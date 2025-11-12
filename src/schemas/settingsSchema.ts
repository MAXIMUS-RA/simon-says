import * as yup from "yup";

export const settingsSchema = yup
    .object({
        backgroundColor: yup
            .string()
            .matches(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #9333ea)")
            .required("Background color is required"),

        accentColor: yup
            .string()
            .matches(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (e.g., #6366f1)")
            .required("Accent color is required"),

        difficulty: yup.string().oneOf(["easy", "medium", "hard"], "Please select a valid difficulty").required("Difficulty is required"),

        numberOfColors: yup.number().min(4, "Minimum 4 colors required").max(6, "Maximum 6 colors allowed").required("Number of colors is required"),
    })
    .required();

export type SettingsFormData = yup.InferType<typeof settingsSchema>;
