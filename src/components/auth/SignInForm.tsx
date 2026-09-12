"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AppleMark, Arrow, GoogleMark, MailMark } from "@/components/ui/Icons";
import { signIn, signOut, useStore } from "@/lib/progress";

/**
 * Sign in.
 *
 * The provider buttons call `signIn` in lib/progress, which is the adapter
 * boundary. Replacing it with NextAuth means changing that file and nothing
 * here: Google and Apple both need a developer account and a redirect URI
 * registered before they will issue credentials.
 */
export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { account, ready } = useStore();
  const [email, setEmail] = useState("");

  const back = params.get("next") ?? "/levels";

  function go(provider: "google" | "apple" | "email", value?: string) {
    signIn(provider, value);
    router.push(back);
  }

  if (ready && account) {
    return (
      <div className="flex flex-col gap-[var(--s-4)]">
        <div className="note note-green">
          <span className="eyebrow">Signed in</span>
          <p>
            {account.email}. Your progress is being saved.
          </p>
        </div>
        <button onClick={() => router.push(back)} className="btn btn-primary btn-lg">
          Continue <Arrow />
        </button>
        <button onClick={signOut} className="btn btn-quiet">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[var(--s-3)]">
      <button onClick={() => go("google")} className="btn btn-outline btn-lg">
        <GoogleMark /> Continue with Google
      </button>
      <button onClick={() => go("apple")} className="btn btn-outline btn-lg">
        <AppleMark /> Continue with Apple
      </button>

      <div className="my-[var(--s-3)] flex items-center gap-[var(--s-4)]">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[12.5px] text-ink-3">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.includes("@")) go("email", email.trim());
        }}
        className="flex flex-col gap-[var(--s-3)]"
      >
        <label htmlFor="email" className="eyebrow">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@work.com"
          className="w-full rounded-[10px] border border-line bg-paper p-[var(--s-4)] text-[15.5px] text-ink outline-none placeholder:text-ink-3 focus:border-blue"
        />
        <button type="submit" className="btn btn-primary btn-lg">
          <MailMark /> Send me a link
        </button>
      </form>

      <p className="mt-[var(--s-2)] text-[12.5px] text-ink-3">
        No password to remember. No card, now or later.
      </p>
    </div>
  );
}
