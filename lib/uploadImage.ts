export async function uploadImage(file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "theater_blog"); // Créez un upload preset sur Cloudinary

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}