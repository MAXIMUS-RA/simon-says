import { useEffect } from "react";
import { useForm } from "react-hook-form";

type SettingsForm = {
    backgroundColor: string;
    accentColor: string;
};

function Settings() {
    const { register, handleSubmit, formState, setValue } = useForm<SettingsForm>();

    const onSubmit = (data: SettingsForm) => {
        console.log("submitted", data);

        localStorage.setItem("colors", JSON.stringify(data));
    };

    useEffect(() => {
        const savedColors = localStorage.getItem("colors");
        if (savedColors) {
            try {
                const colors = JSON.parse(savedColors);
                setValue("backgroundColor", colors.backgroundColor);
                setValue("accentColor", colors.accentColor);
            } catch (error) {
                console.error("Failed to load colors", error);
            }
        }
    }, [setValue]);

    return (
        <div className="w-full h-screen mx-auto bg-purple-800 text-white">
            <div className="container mx-auto">
                <h1 className=" text-4xl text-center py-10">Settings</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-300 mb-1">
                            Background Color
                        </label>
                        <input
                            id="backgroundColor"
                            type="color"
                            {...register("backgroundColor")}
                            className={`w-full h-20 p-2 rounded ${formState.errors.backgroundColor ? "border-red-500" : "border-gray-600"}`}
                        />
                        {formState.errors.backgroundColor && <p className="text-sm text-red-400 mt-1">{formState.errors.backgroundColor.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="accentColor" className="block text-sm font-medium text-gray-300 mb-1">
                            Accent Color
                        </label>
                        <input
                            id="accentColor"
                            type="color"
                            {...register("accentColor")}
                            className={`w-full p-2  h-20 rounded ${formState.errors.accentColor ? "border-red-500" : "border-gray-600"}`}
                        />
                        {formState.errors.accentColor && <p className="text-sm text-red-400 mt-1">{formState.errors.accentColor.message}</p>}
                    </div>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Settings;
