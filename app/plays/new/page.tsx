import PlayForm from "@/components/plays/PlayForm";
import {AppBar} from "@/components/layout/AppBar";

export default function NewPlayPage() {
  return (
        <><AppBar/>
      <main className="container max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Nouvelle Pièce</h1>
        <div className="bg-card p-6 rounded-lg shadow">
          <PlayForm />
        </div>
      </main>
    </>
    );
}