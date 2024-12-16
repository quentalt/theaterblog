import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="container max-w-md mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Inscription</h1>
            <div className="bg-card p-6 rounded-lg shadow">
                <RegisterForm />
            </div>
        </main>
    );
}