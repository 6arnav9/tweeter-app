import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs bg-slate-800 w-full rounded-lg">
        <div className="text-center my-4">
          <h1>
            Tweeter
          </h1>
        </div>
        <div className="bg-slate-900 my-4 p-3 rounded-lg block text-center">
          <Link href="/signin">Sign In</Link>
        </div>
        <div className="bg-slate-900 my-4 p-3 rounded-lg block text-center">
          <Link href="signup">Sign Up</Link>
        </div>
      </div> 
    </main>
  );
}
