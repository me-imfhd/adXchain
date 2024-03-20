import { LandingPage } from "./_components/landing-page";

export default function IndexPage() {
  return (
    <div
      style={{
        backgroundImage: "radial-gradient( #666, #444, #111111, #010101)",
      }}
      className="flex flex-col items-center justify-center w-full"
    >
      <LandingPage />
    </div>
  );
}
