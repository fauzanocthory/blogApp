import Link from "next/link";

export default function NotFound() {
    return (
      <div>
        <h2>Not Found</h2>
        <p>Sorry, the page you looking for is does not exist</p>
        <Link href="/">Return to home</Link>
      </div>
    );
  }
  